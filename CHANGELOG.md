# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-19

This release marks the official submission of **Informed Poll** for the Google Hackathon. It implements a complete end-to-end voting dossier and AI-assisted civic companion with robust test coverage, user authentication, secure ballot management, and containerized cloud deployment.

### Added
- **Civic Dossier**: Complete interactive timeline of the voting journey, detailing registration (Form 6), voter roll verification, and polling booth protocol.
- **Firebase Authentication**: Integrated Google OAuth and Email/Password flows in frontend (`AuthContext`), with OIDC backend token verification in FastAPI.
- **VoteIQ Chat Assistant**: Context-driven chat interface powered by Gemini 2.5 Flash with LanceDB RAG (Retrieval-Augmented Generation) utilizing verified ECI data.
- **Secure Ballot Storage**: Connected `CandidateStack` swipe mechanics to Cloud Firestore for private, encrypted personal ballots.
- **E2E & Unit Test Suites**: Established 134/134 passing Vitest tests for all major components and pages (Hero, Timeline, Candidates, Dossier, Navbar, Footer, NeuralSync) and Playwright for E2E smoke tests.
- **Licensing & Privacy Protection**: Added strict rules to `README.md` prohibiting automated AI scraping, harvesting, and LLM training.

### Changed
- **UI Styling**: Refined Vanilla CSS (Kinetic Catalyst) for fluid, mobile-first responsive interfaces, featuring glassmorphic controls and modern gradients.
- **API Base URLs**: Parameterized API base URL using `import.meta.env.VITE_API_BASE_URL` to facilitate cross-environment deployments (Cloud Run & Vercel).

### Fixed
- Routing issues on refresh by introducing SPA rewrite configurations.

---

[1.1.0]: https://github.com/seeramsujay/informed-poll/compare/1.0.0...1.1.0
