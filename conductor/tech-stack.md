# Tech Stack: Informed Poll

## Frontend
- **Framework**: Vite + React
- **Styling**: Vanilla CSS (The Kinetic Catalyst Design System)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Backend
- **Framework**: FastAPI (Python)
- **Web Server**: Uvicorn
- **Environment**: Python-dotenv

## Data & Persistence
- **Firestore**: Transactional data (Polls, Votes, Ballots).
- **LanceDB**: Vectorized poll context for semantic search and RAG.
- **Path**: `./lancedb/poll_context`

## AI Services
- **Model**: Google Gemini 2.5 Flash (Vertex AI)
- **Integration**: `google-generativeai` SDK

## Infrastructure
- **Compute**: Google Cloud Run (Containerized)
  - Backend: https://informed-poll-backend-51884867643.us-central1.run.app
  - Frontend: https://informed-poll-frontend-51884867643.us-central1.run.app
- **Auth**: Firebase Authentication (OIDC)

## Dependencies (Key)
- `fastapi`
- `firebase-admin`
- `lancedb`
- `google-generativeai`
- `pandas` (for LanceDB ingestion)
