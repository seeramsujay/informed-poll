# Architecture Deep Dive: Informed Poll

## Overview
Informed Poll is a decoupled full-stack application built for horizontal scalability and low-latency AI interactions. The architecture follows the **RAG (Retrieval-Augmented Generation)** pattern to provide grounded, factual responses to civic inquiries.

---

## 1. The RAG Pipeline (Neural Sync)

The core innovation is the interaction between **LanceDB** and **Gemini 2.5 Flash**.

### Data Ingestion
1. **Source**: Official ECI (Election Commission of India) handbooks, PDFs, and civic data.
2. **Chunking**: Semantic chunking using `SentenceTransformers` or Gemini embeddings.
3. **Storage**: Vectors stored in LanceDB (`./lancedb/poll_context`).

### Query Flow
1. User asks a question (e.g., "How do I check my name in the voter list?").
2. Backend generates an embedding for the query.
3. **LanceDB** performs an ANN (Approximate Nearest Neighbor) search to find the top 5 relevant context chunks.
4. The context is injected into a system prompt for **Gemini 2.5 Flash**.
5. Gemini generates a response strictly grounded in the provided context.

---

## 2. Frontend: Kinetic Catalyst Design System

The UI is built using a custom vanilla CSS design system named **Kinetic Catalyst**.

### Key Principles:
- **Zero Dependencies**: Pure CSS for performance and predictability.
- **Glassmorphism**: Heavy use of backdrop filters for a premium feel.
- **Micro-interactions**: Framer Motion (if used) or native CSS transitions for gesture-driven candidate swiping.
- **Mobile First**: Optimized for one-handed operation.

---

## 3. Backend: FastAPI & Stateless Compute

The backend is designed to be fully stateless, allowing it to run on **Google Cloud Run**.

### Authentication Flow:
1. Frontend acquires an ID Token from **Firebase Auth**.
2. Token is passed in the `Authorization: Bearer <token>` header.
3. Backend validates the token using `firebase-admin` (FastAPI Dependency Injection).
4. If valid, the user's `uid` is used to fetch/save their "Personal Ballot" in **Firestore**.

---

## 4. Scalability & Deployment

- **Containerization**: Both frontend (Nginx) and backend (Uvicorn) are containerized.
- **Global Load Balancing**: Managed by Cloud Run.
- **Cold Starts**: Optimized by using the lightweight `gemini-2.5-flash` model and a minimal Docker base image (`python:3.11-slim`).

---

## 5. Security Posture

- **CORS**: Strict origin checks in production.
- **Data Privacy**: No PII (Personally Identifiable Information) stored on-disk; only Firebase UID-indexed data in Firestore.
- **Non-Partisan Design**: AI prompts are strictly tuned to be neutral and informative.
