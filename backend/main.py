import os
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore, auth
import lancedb
import pandas as pd
from dotenv import load_dotenv
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from functools import lru_cache
import time
from collections import defaultdict

# Load env
load_dotenv()

# ── App ──────────────────────────────────────────
app = FastAPI(
    title="Informed Poll API",
    description="Non-partisan civic AI for young voters",
    version="2.0.0",
)

# ── CORS (restricted to configured origins) ──────
_raw_origins = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()] or ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# ── Simple in-memory rate limiter ─────────────────
_rate_store: dict = defaultdict(list)
RATE_LIMIT = int(os.getenv("RATE_LIMIT_PER_MINUTE", "30"))

def check_rate_limit(ip: str) -> bool:
    """Return True if allowed, False if rate-limited."""
    now = time.time()
    window = _rate_store[ip]
    _rate_store[ip] = [t for t in window if now - t < 60]
    if len(_rate_store[ip]) >= RATE_LIMIT:
        return False
    _rate_store[ip].append(now)
    return True

# ── Security ──────────────────────────────────────
security = HTTPBearer(auto_error=False)

async def get_current_user(res: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    """Return decoded Firebase token or None if no/invalid token."""
    if res is None:
        return None
    try:
        decoded_token = auth.verify_id_token(res.credentials)
        return decoded_token
    except Exception:
        return None

async def require_user(res: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    """Strict auth — raises 401 if not authenticated."""
    user = await get_current_user(res)
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user

# ── Firebase ──────────────────────────────────────
if not firebase_admin._apps:
    try:
        cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        project_id = os.getenv("FIRESTORE_PROJECT_ID")

        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        elif project_id:
            firebase_admin.initialize_app(options={'projectId': project_id})
        else:
            firebase_admin.initialize_app()
    except Exception as e:
        print(f"Firebase initialization warning: {e}")

db = None
try:
    db = firestore.client()
except Exception as e:
    print(f"Firestore initialization error: {e}")

# ── LanceDB ───────────────────────────────────────
LANCE_DB_PATH = os.getenv("LANCE_DB_PATH", "./lancedb/poll_context")
lancedb_conn = None
_lancedb_table = None  # cached table reference

try:
    if not os.path.exists(os.path.dirname(LANCE_DB_PATH)):
        os.makedirs(os.path.dirname(LANCE_DB_PATH), exist_ok=True)
    lancedb_conn = lancedb.connect(LANCE_DB_PATH)
except Exception as e:
    print(f"LanceDB initialization error: {e}")

# ── Gemini singleton ──────────────────────────────
_gemini_configured = False

def _ensure_gemini():
    """Configure Gemini client once at startup, not per-request."""
    global _gemini_configured
    if not _gemini_configured:
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            _gemini_configured = True
    return _gemini_configured

@app.on_event("startup")
async def startup_event():
    _ensure_gemini()

def get_embedding(text: str):
    if not _ensure_gemini():
        return None
    try:
        result = genai.embed_content(
            model="models/gemini-embedding-001",
            content=text,
            task_type="retrieval_query"
        )
        return result['embedding']
    except Exception as e:
        print(f"Embedding error: {e}")
        return None

def retrieve_context(query: str, limit: int = 3) -> str:
    global _lancedb_table
    if not lancedb_conn:
        return ""

    try:
        # Cache table reference to avoid repeated opens
        if _lancedb_table is None:
            if "poll_context" not in lancedb_conn.table_names():
                return ""
            _lancedb_table = lancedb_conn.open_table("poll_context")

        vector = get_embedding(query)
        if vector is None:
            return ""

        results = _lancedb_table.search(vector).limit(limit).to_pandas()
        context_str = "\n".join([
            f"[{row['category'].upper()}: {row['title']}] {row['text']}"
            for _, row in results.iterrows()
        ])
        return context_str
    except Exception as e:
        print(f"Context retrieval error: {e}")
        return ""


# ── Models ────────────────────────────────────────
class Poll(BaseModel):
    id: Optional[str] = None
    question: str
    options: List[str]
    context: str

class Vote(BaseModel):
    poll_id: str
    option_index: int

class Ballot(BaseModel):
    user_id: str
    candidate_ids: List[str]
    timestamp: Optional[float] = None

class ChatRequest(BaseModel):
    message: str

    @field_validator('message')
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError('Message cannot be empty')
        if len(v) > 2000:
            raise ValueError('Message too long (max 2000 chars)')
        return v


# ── Routes ────────────────────────────────────────
@app.get("/")
async def root():
    return {"message": "Informed Poll API is running", "platform": "Google Cloud Run", "version": "2.0.0"}

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "firebase": db is not None,
        "lancedb": lancedb_conn is not None,
        "gemini": _gemini_configured,
    }

from fastapi import APIRouter
api_router = APIRouter(prefix="/api")

@api_router.get("/polls", response_model=List[Poll])
async def get_polls():
    if not db:
        return []
    polls_ref = db.collection('polls')
    docs = polls_ref.stream()
    return [Poll(id=doc.id, **doc.to_dict()) for doc in docs]

@api_router.post("/polls", response_model=Poll)
async def create_poll(poll: Poll):
    if not db:
        raise HTTPException(status_code=503, detail="DB offline")
    doc_ref = db.collection('polls').document()
    poll_data = poll.model_dump(exclude={'id'})  # Pydantic v2
    doc_ref.set(poll_data)
    return Poll(id=doc_ref.id, **poll_data)

@api_router.post("/votes")
async def submit_vote(vote: Vote, user: dict = Depends(require_user)):
    if not db:
        raise HTTPException(status_code=503, detail="DB offline")
    try:
        uid = user['uid']
        vote_ref = db.collection('polls').document(vote.poll_id).collection('votes').document(uid)
        vote_ref.set({
            'option_index': vote.option_index,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        return {"status": "success", "user": uid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/ballots")
async def save_ballot(ballot: Ballot, user: Optional[dict] = Depends(get_current_user)):
    uid = user['uid'] if user else (
        ballot.user_id or f"anon_{ballot.candidate_ids[0] if ballot.candidate_ids else 'unknown'}"
    )

    if not db:
        print(f"MOCK: Saved ballot for {uid}: {ballot.candidate_ids}")
        return {"status": "mock_success", "uid": uid}

    try:
        doc_ref = db.collection('ballots').document(uid)
        doc_ref.set({
            'candidate_ids': ballot.candidate_ids,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        return {"status": "success", "uid": uid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/chat")
async def chat_with_gemini(request: ChatRequest, req: Request):
    # Rate limiting
    client_ip = req.client.host if req.client else "unknown"
    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please slow down.")

    if not _ensure_gemini():
        return {"reply": "Neural Sync Offline: Please set GEMINI_API_KEY to connect to the collective."}

    try:
        system_instruction = (
            "You are VoteIQ, a helpful AI assistant for young voters. "
            "Provide concise, clear, and non-partisan information about elections, "
            "voting requirements, and candidate platforms. Use modern, tech-forward language."
        )

        # RAG: Retrieve context
        context = retrieve_context(request.message)

        enriched_prompt = request.message
        if context:
            enriched_prompt = (
                f"Context from the VoteIQ Knowledge Base:\n{context}\n\n"
                f"User Query: {request.message}"
            )

        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=system_instruction
        )
        response = model.generate_content(enriched_prompt)
        return {"reply": response.text}

    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {"reply": "Connection unstable. Collective consciousness temporarily unavailable."}

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
