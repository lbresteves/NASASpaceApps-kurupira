from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi.testclient import TestClient

from app.main import app
from app.routes.clock import get_cuiaba_clock

client = TestClient(app)


def test_clock_converts_utc_to_cuiaba_time():
    noon_utc = datetime(2026, 11, 14, 12, 0, 0, tzinfo=ZoneInfo("UTC"))

    clock = get_cuiaba_clock(noon_utc)

    # Cuiabá is UTC-4 (no daylight saving time since 2019).
    assert clock.timezone == "America/Cuiaba"
    assert clock.date == "2026-11-14"
    assert clock.time == "08:00:00"
    assert clock.iso == "2026-11-14T08:00:00-04:00"


def test_clock_date_rolls_back_before_4am_utc():
    early_utc = datetime(2026, 11, 14, 2, 30, 0, tzinfo=ZoneInfo("UTC"))

    clock = get_cuiaba_clock(early_utc)

    assert clock.date == "2026-11-13"
    assert clock.time == "22:30:00"


def test_clock_route_returns_all_fields():
    response = client.get("/clock")

    assert response.status_code == 200
    assert set(response.json()) == {"timezone", "iso", "date", "time"}
