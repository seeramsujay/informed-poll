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

### Phase 0: Initialization [COMPLETED]
- [x] Repository structure: `frontend/` (Vite) and `backend/` (FastAPI).
- [x] Tailwind CSS properly installed with custom animations.
- [x] Mock data and initial UI shell built.
- [x] Dockerfile and requirements for backend prepared.

### Phase 1: Local Experience & Refinement [ACTIVE]
- [x] Verified local full-stack execution (Vite + FastAPI).
- [/] Implement full candidate swipe logic in `CandidateStack`.
- [/] Connect `ChatAssistant` to local mock responses.
- [ ] Build `RegistrationStepper` component.

### Phase 2: Google Services Integration
- [ ] Connect to Firestore for saving "Personal Ballots".
- [ ] Integrate Gemini API for real AI chat.
- [ ] Deploy container to Cloud Run.

### Phase 3: Final Polish
- [ ] E2E testing with Vitest.
- [ ] Performance audit for Cloud Run cold starts.
- [ ] Accessibility review (ARIA labels, keyboard nav).