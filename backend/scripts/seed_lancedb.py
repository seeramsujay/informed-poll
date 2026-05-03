import os
import lancedb
import pandas as pd
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Setup Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY not found in .env")
    exit(1)

genai.configure(api_key=api_key)

# Data from mock.js (simplified for ingestion)
candidates = [
    {
        "id": "cand_1",
        "title": "Alex Rivers",
        "category": "candidate",
        "text": "Alex Rivers is a System Architect from the Progressive Network party. Bio: Focusing on infrastructure parity and the Kinetic Economy. No partisan lines, just raw system efficiency. Policies: Universal public healthcare, Net-zero climate by 2040, Expand worker cooperatives, Tuition-free community college.",
        "match": 84,
        "party": "Progressive Network"
    },
    {
        "id": "cand_2",
        "title": "Jordan Vance",
        "category": "candidate",
        "text": "Jordan Vance is a Digital Sovereign from the Centrist Coalition party. Bio: Focused on digital sovereignty and environmental restoration. We don't build walls; we build nodes. Policies: Public-private hybrid healthcare, Market-led clean energy, Balanced budget, Merit-based scholarships.",
        "match": 72,
        "party": "Centrist Coalition"
    },
    {
        "id": "cand_3",
        "title": "Elena Martinez",
        "category": "candidate",
        "text": "Elena Martinez is a Liquidity Expert from the Freedom Platform party. Bio: Economic fluidity through decentralized finance. We empower the individual to outpace the institution. Policies: Deregulate healthcare, Tech-led climate adaptation, Flat tax, School choice.",
        "match": 91,
        "party": "Freedom Platform"
    }
]

protocols = [
    {
        "id": "proto_1",
        "title": "Voter Registration Protocol",
        "category": "protocol",
        "text": "Voter Registration involves checking eligibility (US citizen, 18+), gathering documents (SSN, ID), and registering online or by mail 15-30 days before the election. Check status at vote.org."
    },
    {
        "id": "proto_2",
        "title": "Ballot Tracking Protocol",
        "category": "protocol",
        "text": "Ballot Tracking allows monitoring mail-in ballots: Sent, Received, Accepted, Counted. Request ballot 7-15 days before election. Sign envelope exactly as registered."
    }
]

data = candidates + protocols

def get_embeddings(text):
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document"
    )
    return result['embedding']

def seed():
    LANCE_DB_PATH = os.getenv("LANCE_DB_PATH", "./lancedb/poll_context")
    if not os.path.exists(os.path.dirname(LANCE_DB_PATH)):
        os.makedirs(os.path.dirname(LANCE_DB_PATH), exist_ok=True)
    
    db = lancedb.connect(LANCE_DB_PATH)
    
    print("Generating embeddings...")
    for item in data:
        item['vector'] = get_embeddings(item['text'])
    
    df = pd.DataFrame(data)
    
    # Create or overwrite table
    table_name = "poll_context"
    if table_name in db.table_names():
        db.drop_table(table_name)
    
    db.create_table(table_name, data=df)
    print(f"Successfully seeded {len(data)} items into {table_name}")

if __name__ == "__main__":
    seed()
