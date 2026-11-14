import duckdb
from fastapi.testclient import TestClient

from app.hotspot_data import DATA_FILE
from app.main import app

client = TestClient(app)


def test_calendar_has_one_total_per_month():
    response = client.get("/calendar", params={"metric": "modis"})

    assert response.status_code == 200
    body = response.json()
    assert body["metric"] == "modis"
    assert len(body["months"]) == 14 * 12
    assert body["months"][0] == {"year": 2012, "month": 1, "hotspots": body["months"][0]["hotspots"]}


def test_calendar_total_matches_the_daily_national_file():
    daily_file = DATA_FILE.parent / "brazil_daily_2012_2025.parquet"
    expected = duckdb.sql(
        f"SELECT sum(modis_hotspots) FROM read_parquet('{daily_file.as_posix()}') "
        "WHERE year(date) = 2012 AND month(date) = 1"
    ).fetchall()[0][0]

    months = client.get("/calendar", params={"metric": "modis"}).json()["months"]
    january_2012 = next(month for month in months if month["year"] == 2012 and month["month"] == 1)

    assert january_2012["hotspots"] == expected


def test_calendar_defaults_to_the_harmonized_metric():
    assert client.get("/calendar").json()["metric"] == "harmonized"
