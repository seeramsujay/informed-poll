# Informed Poll / VoteIQ Roadmap

AI-powered polling platform for Google Hackathons.

## 1. Concept & Vision
Interactive election guide with swippable candidate cards, real-time timelines, and an AI assistant grounded in Google Civic data.

## 2. Tech Stack
- **Frontend**: Vite + React + Tailwind CSS + Lucide React.
- **Backend**: FastAPI (Python) + Firebase Admin SDK.
- **Database**: Firestore (Transactional) + LanceDB (Vector Search).
- **Compute**: Google Cloud Run.
- **AI**: Google Gemini (Vertex AI).

## 3. Core Features
- **Swipeable Candidate Cards**: Tactical gesture-driven interface for building personal ballots.
- **Interactive Timeline**: Visualizing the voting journey.
- **AI Assistant**: RAG-powered chatbot for accurate election info.

## 4. Development Status

### Phase 1: Local Experience & Refinement [COMPLETED]
- [x] Verified local full-stack execution (Vite + FastAPI).
- [x] Implement full candidate swipe logic in `CandidateStack`.
- [x] Connect `ChatAssistant` to production AI responses.
- [x] Integrate comprehensive ECI content via `Dossier` page.
- [x] Build `RegistrationStepper` component.

### Phase 2: Google Services Integration [COMPLETED]
- [x] Connect to Firestore for saving "Personal Ballots".
- [x] Integrate Gemini API (Upgraded to Gemini 2.5 Flash) for grounded AI chat.
- [x] Firebase Auth on frontend (Email + Google OAuth).
- [x] Backend token verification with OIDC.
- [x] High-fidelity RAG using LanceDB.

### Phase 3: Deployment & Scale [COMPLETED]
- [x] Containerized multi-service deployment to Google Cloud Run.
  - **Backend**: https://informed-poll-backend-51884867643.us-central1.run.app
  - **Frontend**: https://informed-poll-frontend-51884867643.us-central1.run.app
- [x] CI/CD pipeline automation via Cloud Build.
- [x] E2E verification (91/91 Vitest tests passed).
- [x] Premium documentation overhaul (Hackernews-standard).