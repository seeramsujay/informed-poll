# Contributing to Informed Poll

First off, thank you for considering contributing to Informed Poll! It's people like you that make civic tech better for everyone.

---

## 🏗️ Development Workflow

1. **Fork the repo** and create your branch from `main`.
2. **Setup your environment**:
   - Install Python 3.11+ and Node.js 18+.
   - Run `pip install -r requirements.txt`.
   - Run `cd frontend && npm install`.
3. **Coding Standards**:
   - We use **FastAPI** for the backend and **Vite/React** for the frontend.
   - For styling, we use the **Kinetic Catalyst** vanilla CSS system. Avoid adding new CSS frameworks.
   - Keep components modular and logic separate from presentation.
4. **Testing**:
   - Ensure you run existing tests: `npm test` or `pytest`.
   - Aim for high coverage (current is 91%).

---

## 🧪 Adding Data to the RAG Engine

If you want to add new civic data to the RAG pipeline:
1. Place the raw text/markdown in `lancedb/source_data/`.
2. Run the ingestion script: `python scripts/ingest_data.py`.
3. Verify the embeddings in the LanceDB table.

---

## 🚀 Pull Request Process

1. Ensure all linting and tests pass.
2. Update the `README.md` or relevant documentation if your change introduces new features.
3. Your PR will be reviewed by the maintainers. We aim for high-quality, readable code.

---

## ⚖️ License
By contributing, you agree that your contributions will be licensed under the MIT License.

---

*Thank you for helping young voters make informed choices!*
