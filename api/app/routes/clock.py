from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["clock"])

CUIABA_TIMEZONE = "America/Cuiaba"


class ClockResponse(BaseModel):
    timezone: str
    iso: str
    date: str
    time: str


def get_cuiaba_clock(now: datetime | None = None) -> ClockResponse:
    """Current date and time in Cuiabá. `now` lets tests pass a fixed moment."""
    local_now = (now or datetime.now(ZoneInfo("UTC"))).astimezone(ZoneInfo(CUIABA_TIMEZONE))
    return ClockResponse(
        timezone=CUIABA_TIMEZONE,
        iso=local_now.isoformat(timespec="seconds"),
        date=local_now.strftime("%Y-%m-%d"),
        time=local_now.strftime("%H:%M:%S"),
    )


@router.get("/clock")
def read_clock() -> ClockResponse:
    return get_cuiaba_clock()
