import lancedb
import os

def init_db():
    db_path = os.getenv("LANCE_DB_PATH", "./lancedb/poll_context")
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    
    db = lancedb.connect(db_path)
    
    # Create tables if they don't exist
    if "poll_context" not in db.table_names():
        db.create_table("poll_context", schema={
            "id": "string",
            "text": "string",
            "vector": "vector(768)" # Example vector size for Gemini embeddings
        })
    print(f"LanceDB initialized at {db_path}")

if __name__ == "__main__":
    init_db()
