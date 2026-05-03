# API Reference: Informed Poll

The Informed Poll API is built with **FastAPI** and provides endpoints for poll management, voting, and RAG-powered chat.

**Base URL**: `https://informed-poll-backend-51884867643.us-central1.run.app`

---

## 🔐 Authentication
Most `POST` endpoints require a Firebase ID Token passed in the `Authorization` header.

```http
Authorization: Bearer <firebase_id_token>
```

---

## 📊 Polls

### Get All Polls
Retrieve a list of active polls from Firestore.

- **URL**: `/api/polls`
- **Method**: `GET`
- **Response**: `List[Poll]`

```json
[
  {
    "id": "poll_123",
    "question": "Who should lead the new economic council?",
    "options": ["Alice", "Bob", "Charlie"],
    "context": "Focus on infrastructure and tech growth."
  }
]
```

### Create a Poll
*Requires admin access (simulated).*

- **URL**: `/api/polls`
- **Method**: `POST`
- **Body**: `Poll`

---

## 🗳️ Voting

### Submit a Vote
Cast a vote on a specific poll. Uses the authenticated user's `uid` to prevent double-voting.

- **URL**: `/api/votes`
- **Method**: `POST`
- **Auth**: Required
- **Body**:
```json
{
  "poll_id": "string",
  "option_index": 0
}
```

---

## 📜 Ballots

### Save Personal Ballot
Saves a list of preferred candidate IDs for the user.

- **URL**: `/api/ballots`
- **Method**: `POST`
- **Auth**: Optional (falls back to anonymous mapping if not provided)
- **Body**:
```json
{
  "user_id": "string",
  "candidate_ids": ["cand_1", "cand_2"]
}
```

---

## 💬 Neural Sync (AI Chat)

### Ask VoteIQ
Interact with the RAG-powered assistant. Query is embedded, relevant context is retrieved from LanceDB, and Gemini 2.5 Flash generates the grounded response.

- **URL**: `/api/chat`
- **Method**: `POST`
- **Body**:
```json
{
  "message": "What are the requirements for Form 6?"
}
```
- **Response**:
```json
{
  "reply": "According to the ECI, Form 6 is for registration as a new voter..."
}
```

---

## 🛠️ Development & Debugging

### Swagger UI
FastAPI provides an interactive API playground at `/docs`.

### Health Check
- **URL**: `/`
- **Method**: `GET`
- **Response**: `{"message": "Informed Poll API is running", "platform": "Google Cloud Run"}`
