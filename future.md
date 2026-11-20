# Informed Poll: Architectural Review & Civic Intelligence Roadmap (future.md)

---

## 1. Architectural Code Review & Current State Analysis

Informed Poll is a mobile-first, high-fidelity election companion designed for first-time voters to demystify complex political landscapes. Built with **React 18 / Vite** on the frontend, **FastAPI** on the backend, and containerized on **Google Cloud Run**, it couples tactical swipeable candidate profile cards with an hallucination-free AI assistant (VoteIQ) grounded in verified Election Commission of India (ECI) data via **LanceDB** vector search and **Gemini 2.5 Flash**.

### Architectural Strengths
- **Tactical Gesture Interface:** Swipeable candidate cards (`CandidateStack`) allow quick evaluation of criminal disclosures, educational qualifications, and asset statements.
- **Strictly Grounded ECI Vector Store:** Embeds verified ECI PDFs and constituency data into LanceDB to eliminate conversational hallucinations.
- **Serverless Production Scale:** Dual Cloud Run microservices (Frontend & Backend) with automated Cloud Build CI/CD deployment.

### Identified Bottlenecks & Modernization Needs
1. **Multilingual Access Barrier:** Optimized primarily for English queries, creating an accessibility barrier for non-English speaking regional voters across India.
2. **Dynamic Polling Station Mapping:** Lacks integration with real-time GPS geolocation and ECI polling booth GIS maps for turn-by-turn navigation.
3. **Absence of Campaign Promise Verification:** Affidavits show historical wealth and legal status, but party manifestos and post-election delivery metrics are not yet tracked dynamically.

---

## 2. Strategic Engineering Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: Indic Multilingual & Voice Ingestion
        P1A[Bhashini AI Indic Speech Recognizer] --> P1B[22 Scheduled Indian Languages Translation]
        P1B --> P1C[Voice-Activated Constituency Query Agent]
    end

    subgraph Phase 2: Distributed Serverless Vector Store
        P2A[LanceDB Cloud / GCS Serverless Indexing] --> P2B[Constituency Geo-Sharded Vector Buckets]
        P2B --> P2C[Sub-50ms Cold-Start Query Cache]
    end

    subgraph Phase 3: Zero-Knowledge Ballot Privacy & PWA
        P3A[Zero-Knowledge Ballot Cryptography] --> P3B[Offline PWA Polling Booth Mode]
        P3B --> P3C[Automated Polling Station Geo-Locator]
    end

    subgraph Phase 4: Dynamic Campaign Truth & Policy Tracer
        P4A[Automated Fact-Checking News Crawler] --> P4B[Manifesto vs Execution Audit Ledger]
        P4B --> P4C[Civic Community Deliberation Circles]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

## 3. Detailed Milestone Execution Plan

### Milestone 1: Multilingual Voice Interface via Bhashini
- [ ] **Indic Speech-to-Text:** Integrate Government of India Bhashini APIs to support voice inquiries across Hindi, Tamil, Telugu, Bengali, Marathi, and Kannada.
- [ ] **Localized Audio Readout:** Synthesize audio candidate summaries for voters with low literacy.
- [ ] **Transliteration Engine:** Handle Hinglish / Tanglish phonetic text queries natively.

### Milestone 2: Cloud-Native Vector Architecture & Geo-Sharding
- [ ] **Cloud Storage LanceDB Ingestion:** Persist vector indexes to Google Cloud Storage (GCS) buckets sharded by State and Parliamentary Constituency (PC).
- [ ] **Redis Vector Cache:** Cache high-frequency candidate queries in Memorystore Redis to keep query latency below $<35\text{ms}$.

### Milestone 3: Privacy-Preserving zk-Ballots & Offline PWA
- [ ] **Client-Side Zero-Knowledge Encryption:** Implement client-side cryptographic hashing so personal candidate shortlists are never visible to the server or advertising trackers.
- [ ] **Offline Progressive Web App (PWA):** Enable full offline functionality inside the polling booth so voters can review their saved candidates without cellular reception.
- [ ] **Automated Polling Station Locator:** Integrate OpenStreetMap / ECI GIS APIs for turn-by-turn navigation to assigned electoral booths.

### Milestone 4: Continuous Fact-Checking & Manifesto Audit
- [ ] **Live Campaign Fact-Checker:** Ingest verified fact-checking feeds (AltNews, BoomLive, PIB FactCheck) to flag viral misinformation during active election cycles.
- [ ] **Historical Promise Tracker:** Track historical legislative voting records against past party manifestos to compute objective delivery scores.
