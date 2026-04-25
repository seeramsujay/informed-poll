# Informed Poll

AI-powered polling platform for Google Hackathons.

## Architecture
- **Backend**: FastAPI (Python)
- **Database**: 
  - **Firestore**: User data, polls, and votes.
  - **LanceDB**: Vectorized poll context for semantic search and RAG.
- **Compute**: Google Cloud Run (Containerized).
- **AI**: Vertex AI (Gemini) for automated summarization and context generation.
- **Auth**: Firebase Authentication.

## Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run locally:
   ```bash
   python main.py
   ```

## Roadmap
See [lancedb/ROADMAP.md](lancedb/ROADMAP.md) for project phases.
