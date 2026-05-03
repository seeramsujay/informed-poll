# Future Steps: Informed Poll

## Priority 1: Performance & UX
- [ ] **Optimize Cold Starts**: Implement lazy loading for Gemini models and use a smaller Python runtime.
- [ ] **Offline Mode**: Cache candidate cards and basic civic info using Service Workers.
- [ ] **Accessibility Audit**: Ensure 100/100 Lighthouse score for accessibility.

## Priority 2: Data Expansion
- [ ] **Multilingual Support**: Add Hindi and regional language support for the AI assistant.
- [ ] **Live Election Results**: Integrate a real-time feed for election counting day.
- [ ] **Candidate Deep Dive**: Add more metadata (education, criminal records, assets) from MyNeta or similar APIs.

## Priority 3: Scale
- [ ] **Kubernetes Migration**: If traffic exceeds Cloud Run limits, migrate to GKE.
- [ ] **Distributed Vector Search**: Explore LanceDB Cloud for multi-region RAG.

## Priority 4: Community
- [ ] **Open Data API**: Allow other civic tech apps to query our grounded RAG engine.
- [ ] **Youth Outreach**: Partner with colleges to integrate Informed Poll into civic education programs.
