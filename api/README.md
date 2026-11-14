# Kurupira API

FastAPI backend that serves hotspot data to the web app.

## Run locally

Requires **Python 3.12+** (Vercel runs 3.12).

```bash
cd api
py -3.12 -m venv .venv            # Windows (or: python3.12 -m venv .venv)
.venv\Scripts\activate            # Windows (macOS/Linux: source .venv/bin/activate)
pip install -r requirements-dev.txt
copy .env.example .env            # macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload
```

- API: <http://localhost:8000>
- Interactive docs (try every route in the browser): <http://localhost:8000/docs>

## Checks

```bash
pytest          # tests
ruff check .    # lint
ruff format .   # format
```

## Structure

```
api/
├── app/
│   ├── main.py          ← FastAPI app + CORS; Vercel's entrypoint
│   ├── config.py        ← settings from environment variables
│   └── routes/          ← one file per group of routes
├── tests/
├── requirements.txt     ← what production needs (Vercel installs this)
└── requirements-dev.txt ← + local tools (uvicorn, pytest, ruff)
```

## Environment variables

| Name | Example | What for |
|------|---------|----------|
| `ALLOWED_ORIGINS` | `http://localhost:5173,https://<web>.vercel.app` | Sites allowed to call the API (CORS) |
| `FIRMS_MAP_KEY` | — | NASA FIRMS key (later steps) |

## Deploy (Vercel)

A separate Vercel project with **Root Directory = `api`**. Vercel detects FastAPI from `app/main.py`
and installs `requirements.txt`. Set `ALLOWED_ORIGINS` in the project's environment variables.
