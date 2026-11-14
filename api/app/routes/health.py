from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/")
def read_root() -> dict[str, str]:
    return {"name": "Kurupira API", "message": "Hello, Earthlings!", "docs": "/docs"}


@router.get("/health")
def read_health() -> dict[str, str]:
    return {"status": "ok"}
