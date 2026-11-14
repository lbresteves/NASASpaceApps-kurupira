import os

DEFAULT_ALLOWED_ORIGINS = "http://localhost:5173"


def get_allowed_origins() -> list[str]:
    """Origins allowed to call the API (CORS). Comma-separated in the ALLOWED_ORIGINS env var."""
    raw = os.getenv("ALLOWED_ORIGINS", DEFAULT_ALLOWED_ORIGINS)
    return [origin.strip() for origin in raw.split(",") if origin.strip()]
