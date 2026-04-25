import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore, auth
import lancedb
import pandas as pd

# Initialize FastAPI
app = FastAPI(title="Informed Poll API")

# Initialize Firebase
# Note: For Cloud Run, service account is usually inferred from the environment
if not firebase_admin._apps:
    try:
        firebase_admin.initialize_app()
    except Exception as e:
        print(f"Firebase initialization error: {e}")

db = firestore.client()

# Initialize LanceDB
LANCE_DB_PATH = os.getenv("LANCE_DB_PATH", "./lancedb/poll_context")
lancedb_conn = lancedb.connect(LANCE_DB_PATH)

# Models
class Poll(BaseModel):
    id: Optional[str] = None
    question: str
    options: List[str]
    context: str # The "Informed" part

class Vote(BaseModel):
    poll_id: str
    option_index: int
    user_token: str # Firebase Auth ID Token

@app.get("/")
async def root():
    return {"message": "Informed Poll API is running", "platform": "Google Cloud Run"}

@app.get("/polls", response_model=List[Poll])
async def get_polls():
    polls_ref = db.collection('polls')
    docs = polls_ref.stream()
    return [Poll(id=doc.id, **doc.to_dict()) for doc in docs]

@app.post("/polls", response_model=Poll)
async def create_poll(poll: Poll):
    # Store in Firestore
    doc_ref = db.collection('polls').document()
    poll_data = poll.dict(exclude={'id'})
    doc_ref.set(poll_data)
    
    # Store context in LanceDB for vector search (Phase 1)
    # table = lancedb_conn.create_table("context", data=[{"id": doc_ref.id, "text": poll.context}], mode="append")
    
    return Poll(id=doc_ref.id, **poll_data)

@app.post("/votes")
async def submit_vote(vote: Vote):
    try:
        # Verify Firebase Token
        decoded_token = auth.verify_id_token(vote.user_token)
        uid = decoded_token['uid']
        
        # Check if user already voted (Phase 1)
        # ... logic here ...
        
        # Record vote in Firestore
        vote_ref = db.collection('polls').document(vote.poll_id).collection('votes').document(uid)
        vote_ref.set({
            'option_index': vote.option_index,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        
        return {"status": "success", "user": uid}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
