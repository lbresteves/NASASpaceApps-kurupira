from fastapi.testclient import TestClient

from app.config import get_allowed_origins
from app.main import app

client = TestClient(app)


def test_root_says_hello():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == "Hello, Earthlings!"


def test_health_is_ok():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_allowed_origins_reads_comma_separated_env(monkeypatch):
    monkeypatch.setenv("ALLOWED_ORIGINS", "http://localhost:5173, https://kurupira.vercel.app")

    assert get_allowed_origins() == ["http://localhost:5173", "https://kurupira.vercel.app"]
