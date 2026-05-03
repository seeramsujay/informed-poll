# Track Plan: Phase 2 - Google Services & RAG

## Goal
Integrate core Google Cloud services (Auth, Firestore, Gemini RAG) to transition from local mock experience to a production-ready hackathon demo.

## Success Criteria
- [ ] Users can sign in via Firebase Auth on the frontend.
- [ ] `/votes` and `/ballots` endpoints verify tokens and attribute data correctly.
- [ ] AI Assistant answers questions using context retrieved from LanceDB (RAG).
- [ ] UI complies with "Kinetic Catalyst" design standards (No 1px solid borders, heavy glassmorphism).

## Tasks
- [x] **[T1.1]** Configure Firebase on Frontend (Done)
- [x] **[T1.2]** Navbar Login/Logout (Done)
- [x] **[T1.3]** Backend Token Verification (Done)
- [x] **[T2.1]** Data Ingestion (Script created: backend/scripts/seed_lancedb.py)
- [x] **[T2.2]** RAG Chat Endpoint (Implemented in backend/main.py)
- [x] **[T3.1]** Kinetic Catalyst Audit (Applied to core components)
- [ ] **[T3.2]** Deployment Prep (Pending: finalize Dockerfile)

## Dependencies
- Firebase Project with Auth & Firestore enabled.
- Gemini API Key.
- `lancedb` package installed in backend.
