"""
Backend API tests for Informed Poll FastAPI server.
Run with: pytest backend/tests/ -v
"""
import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from fastapi.testclient import TestClient

# Patch Firebase before importing main to avoid real init
with (
    patch('firebase_admin.initialize_app', return_value=MagicMock()),
    patch('firebase_admin._apps', {'default': True}),
    patch('firebase_admin.firestore.client', return_value=None),
    patch('lancedb.connect', return_value=MagicMock()),
):
    from main import app

client = TestClient(app)


# ── Root & Health ─────────────────────────────────
class TestRoot:
    def test_root_returns_200(self):
        res = client.get("/")
        assert res.status_code == 200

    def test_root_has_message(self):
        res = client.get("/")
        assert "message" in res.json()

    def test_root_has_platform(self):
        res = client.get("/")
        assert res.json()["platform"] == "Google Cloud Run"

    def test_health_endpoint(self):
        res = client.get("/health")
        assert res.status_code == 200
        data = res.json()
        assert "status" in data
        assert data["status"] == "ok"

    def test_health_has_service_flags(self):
        res = client.get("/health")
        data = res.json()
        assert "firebase" in data
        assert "lancedb" in data
        assert "gemini" in data


# ── Chat endpoint ─────────────────────────────────
class TestChat:
    def test_chat_empty_message_rejected(self):
        res = client.post("/api/chat", json={"message": ""})
        assert res.status_code == 422  # Pydantic validation error

    def test_chat_message_too_long_rejected(self):
        res = client.post("/api/chat", json={"message": "x" * 2001})
        assert res.status_code == 422

    def test_chat_whitespace_only_rejected(self):
        res = client.post("/api/chat", json={"message": "   "})
        assert res.status_code == 422

    def test_chat_missing_message_field(self):
        res = client.post("/api/chat", json={})
        assert res.status_code == 422

    @patch('main._ensure_gemini', return_value=False)
    def test_chat_offline_when_no_gemini(self, _):
        res = client.post("/api/chat", json={"message": "How do I vote?"})
        assert res.status_code == 200
        assert "reply" in res.json()
        assert "Offline" in res.json()["reply"] or "GEMINI_API_KEY" in res.json()["reply"]

    @patch('main._ensure_gemini', return_value=True)
    @patch('main.retrieve_context', return_value="")
    @patch('main.genai.GenerativeModel')
    def test_chat_returns_reply_on_success(self, mock_model_cls, mock_ctx, mock_gemini):
        mock_model = MagicMock()
        mock_model.generate_content.return_value = MagicMock(text="You can vote at 18.")
        mock_model_cls.return_value = mock_model

        res = client.post("/api/chat", json={"message": "When can I vote?"})
        assert res.status_code == 200
        assert res.json()["reply"] == "You can vote at 18."

    @patch('main._ensure_gemini', return_value=True)
    @patch('main.retrieve_context', return_value="")
    @patch('main.genai.GenerativeModel')
    def test_chat_handles_gemini_exception(self, mock_model_cls, mock_ctx, mock_gemini):
        mock_model = MagicMock()
        mock_model.generate_content.side_effect = Exception("API error")
        mock_model_cls.return_value = mock_model

        res = client.post("/api/chat", json={"message": "Test question"})
        assert res.status_code == 200
        assert "reply" in res.json()
        assert "unstable" in res.json()["reply"].lower() or "unavailable" in res.json()["reply"].lower()

    def test_chat_valid_max_message(self):
        """2000-char message should be accepted (boundary value)."""
        with patch('main._ensure_gemini', return_value=False):
            res = client.post("/api/chat", json={"message": "a" * 2000})
            assert res.status_code == 200


# ── Rate limiting ──────────────────────────────────
class TestRateLimit:
    def test_rate_limit_allows_normal_requests(self):
        """Single request from unique IP should not be rate limited."""
        with patch('main._ensure_gemini', return_value=False):
            res = client.post(
                "/api/chat",
                json={"message": "Hello"},
                headers={"X-Real-IP": "10.0.0.1"},
            )
            assert res.status_code == 200

    def test_rate_limit_function_allows_below_limit(self):
        from main import check_rate_limit, _rate_store
        _rate_store.clear()
        for _ in range(29):
            assert check_rate_limit("test-ip-1") is True

    def test_rate_limit_function_blocks_at_limit(self):
        from main import check_rate_limit, _rate_store, RATE_LIMIT
        _rate_store.clear()
        for _ in range(RATE_LIMIT):
            check_rate_limit("test-ip-2")
        assert check_rate_limit("test-ip-2") is False


# ── Ballots ───────────────────────────────────────
class TestBallots:
    def test_save_ballot_no_db_returns_mock_success(self):
        """When DB is None, ballot save returns mock_success."""
        with patch('main.db', None):
            res = client.post("/api/ballots", json={
                "user_id": "anon_123",
                "candidate_ids": ["c1", "c2"]
            })
            assert res.status_code == 200
            data = res.json()
            assert data["status"] == "mock_success"

    def test_save_ballot_empty_candidate_ids(self):
        """Empty candidate_ids array is valid (voter dismissed all)."""
        with patch('main.db', None):
            res = client.post("/api/ballots", json={
                "user_id": "anon_xyz",
                "candidate_ids": []
            })
            assert res.status_code == 200


# ── Polls ──────────────────────────────────────────
class TestPolls:
    def test_get_polls_no_db_returns_empty_list(self):
        """Without DB, polls endpoint returns empty array gracefully."""
        with patch('main.db', None):
            res = client.get("/api/polls")
            assert res.status_code == 200
            assert res.json() == []

    def test_create_poll_no_db_returns_503(self):
        with patch('main.db', None):
            res = client.post("/api/polls", json={
                "question": "Test?",
                "options": ["A", "B"],
                "context": "Testing"
            })
            assert res.status_code == 503


# ── Input validation model ─────────────────────────
class TestChatRequestModel:
    def test_strips_whitespace(self):
        from main import ChatRequest
        req = ChatRequest(message="  hello  ")
        assert req.message == "hello"

    def test_rejects_empty_after_strip(self):
        from main import ChatRequest
        with pytest.raises(Exception):
            ChatRequest(message="   ")

    def test_rejects_over_limit(self):
        from main import ChatRequest
        with pytest.raises(Exception):
            ChatRequest(message="x" * 2001)
