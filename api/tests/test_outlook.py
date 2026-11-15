import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.routes.outlook import comparison_collection, read_comparison_cells, read_forecast_cells

client = TestClient(app)


def test_forecast_returns_cells_and_a_national_summary():
    response = client.get("/outlook/forecast", params={"period": "2026-12"})

    assert response.status_code == 200
    body = response.json()
    assert len(body["features"]) > 0
    assert set(body["features"][0]["properties"]) == {"expected", "detection_pct", "critical_days"}
    assert body["summary"]["days"] == 31
    assert 0 <= body["summary"]["high_activity_probability_max_pct"] <= 100


def test_forecast_cells_only_include_cells_with_expected_hotspots():
    assert all(expected > 0 for _, _, expected, *_ in read_forecast_cells(2027, 1))


def test_forecast_outside_dec_2026_and_jan_2027_is_not_found():
    assert client.get("/outlook/forecast", params={"period": "2027-02"}).status_code == 404


def test_comparison_anomaly_is_observed_minus_average():
    for _, _, observed, average, anomaly in read_comparison_cells(2024, 12):
        assert anomaly == pytest.approx(observed - average)


def test_comparison_summary_compares_national_totals():
    summary = comparison_collection([(-10.0, -50.0, 3.0, 2.0, 1.0), (-11.0, -51.0, 0.0, 2.0, -2.0)])["summary"]

    assert summary == {"observed_total": 3, "average_total": 4, "anomaly_pct": -25.0}


def test_comparison_only_covers_december_and_january():
    assert client.get("/outlook/comparison", params={"period": "2024-12"}).status_code == 200
    assert client.get("/outlook/comparison", params={"period": "2024-08"}).status_code == 404


def test_period_must_be_year_and_month():
    assert client.get("/outlook/forecast", params={"period": "2026-13"}).status_code == 422
    assert client.get("/outlook/comparison", params={"period": "Dec 2024"}).status_code == 422


def test_months_list_the_forecast_and_comparison_periods_with_national_totals():
    body = client.get("/outlook/months").json()

    assert [month["period"] for month in body["forecast"]] == ["2026-12", "2027-01"]
    assert len(body["comparison"]) == 28
    assert {month["period"][5:] for month in body["comparison"]} == {"01", "12"}


def test_months_match_the_comparison_summary_of_the_same_period():
    months = {month["period"]: month for month in client.get("/outlook/months").json()["comparison"]}
    summary = client.get("/outlook/comparison", params={"period": "2015-12"}).json()["summary"]

    assert months["2015-12"]["observed_total"] == summary["observed_total"]
    assert months["2015-12"]["anomaly_pct"] == summary["anomaly_pct"]
