# Project Ideasheet

* **Title:** Interactive Election Assistant
* **Tiny Description:** A highly visual, Gen-Z focused election guide featuring a zero-hallucination Gemini RAG chatbot, deployed via Docker on Google Cloud Run with a Firestore backend.
* **Time requirement:** 8
* **Software-to-hardware scale:** 0

---

## 1. Concept & Vision
Civic participation portals are traditionally dense, bureaucratic, and highly unengaging for university students. This project aims to synthesize sophisticated cloud engineering with avant-garde design to create a frictionless, gamified election guide. 

By replacing static "walls of text" with interactive micro-interactions—such as swipeable candidate cards and dynamic timelines—we reduce cognitive friction. The addition of a RAG-powered, strictly grounded AI assistant ensures voters get personalized, instantly accessible, and completely accurate election information.

## 2. Technical Stack
* **Frontend:** Next.js 15 (App Router), React, TypeScript
* **Styling/UI:** Tailwind CSS, Framer Motion (for physics-based animations)
* **Backend Database:** Google Cloud Firestore (NoSQL, Firebase Admin SDK)
* **AI & Data Integration:** Google Gemini API (1.5 Flash), Google Civic Information API
* **Deployment & DevOps:** Google Cloud Run, Google Secret Manager, Docker (Multi-stage builds)

## 3. Core Features (The "Sick UI" Elements)
* **Gamified Registration Stepper:** A multi-stage, animated wizard replacing traditional forms, tracking progress visually.
* **Swipeable Candidate Cards:** A tactile, gesture-driven interface (using Framer Motion) to review candidate profiles and swipe right to build a "Personal Ballot."
* **Dynamic Election Timeline:** A scrollytelling component breaking down key dates (registration, early voting, election day) chronologically.
* **Zero-Hallucination AI Chat:** A streaming chatbot powered by Gemini that explicitly uses the Civic Information API as a "Contextual Anchor," strictly preventing fabricated election data.

---

## 4. Development Roadmap

### Phase 1: Foundation & Firebase Integration (Week 1)
* [ ] Initialize Next.js 15 project with TypeScript, Tailwind CSS, and optimized folder structure.
* [ ] Set up Google Cloud project, configure Firestore, and establish Security Rules.
* [ ] Implement Firebase Admin SDK for server-side operations and secure authentication routes.
* [ ] Write multi-stage `Dockerfile` and verify deployment to Google Cloud Run via Artifact Registry.

### Phase 2: Data Hooks & Visual Components (Week 2)
* [ ] Integrate the Google Civic Information API to fetch location-based polling and representative data.
* [ ] Build the dynamic Election Timeline component.
* [ ] Develop the Gamified Voter Registration Stepper.
* [ ] Create Firestore service functions for saving to the `personal_ballots` collection.

### Phase 3: AI Engine & High-End Interactions (Week 3)
* [ ] Implement the Swipeable Candidate Card stack using Framer Motion.
* [ ] Set up the `/api/chat` Route Handler using the Vercel AI SDK.
* [ ] Craft the "Verification Fence" system prompt for Gemini to enforce zero hallucination.
* [ ] Connect the Civic API output directly into the Gemini context window (RAG pipeline).

### Phase 4: Hardening & Evaluation Prep (Week 4)
* [ ] **Testing:** Write unit tests for data fetchers and end-to-end (E2E) UI tests for the card swiper.
* [ ] **Security:** Verify Firestore Security Rules (RLS equivalent) and lock down Secret Manager permissions.
* [ ] **Accessibility:** Audit contrast ratios, keyboard navigation traps, and ARIA labels.
* [ ] **Efficiency Optimization:** Confirm standalone Next.js build is active to minimize cold-start latency on Cloud Run.

---

## 5. Evaluation Success Matrix
This project is explicitly architected to achieve maximum scores across the following rubric:
1. **Code Quality:** Strict TypeScript schemas, modular feature directories, server-side actions.
2. **Security:** GCP Secret Manager, sanitized AI prompts, strict Firestore matching rules.
3. **Efficiency:** Minimal Docker container footprint via Alpine Linux multi-stage builds.
4. **Testing:** Automated Jest/Vitest checks integrated into the deployment pipeline.
5. **Accessibility:** Comprehensive screen-reader support on complex motion UI elements.
6. **Google Services:** Deep integration of Cloud Run, Firestore, Gemini API, and Civic Information API.