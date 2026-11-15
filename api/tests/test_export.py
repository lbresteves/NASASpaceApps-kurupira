import csv
import io

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

PARAMS = {"years": [2023, 2024], "months": [8, 9]}


def test_csv_has_one_row_per_month_with_every_sensor_column():
    response = client.get("/export/monthly", params=PARAMS)

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/csv")
    assert 'filename="kurupira_hotspots_brazil_2023-2024.csv"' in response.headers["content-disposition"]
    assert response.text.startswith("﻿")
    rows = list(csv.DictReader(io.StringIO(response.text.removeprefix("﻿"))))
    assert [(row["year"], row["month"]) for row in rows] == [("2023", "8"), ("2023", "9"), ("2024", "8"), ("2024", "9")]
    assert set(rows[0]) == {
        "year",
        "month",
        "area",
        "modis_hotspots",
        "viirs_snpp_hotspots",
        "viirs_modis_equivalent_hotspots",
        "harmonized_hotspots_modis_equivalent",
    }
    assert rows[0]["area"] == "Brazil"


def test_json_matches_the_region_summary_for_a_state():
    body = client.get("/export/monthly", params={**PARAMS, "state": "51", "format": "json"}).json()
    summary = client.get("/regions/summary", params=PARAMS).json()
    mato_grosso = next(state for state in summary["states"] if state["code"] == "51")

    assert body["area"] == "Mato Grosso"
    assert sum(month["modis_hotspots"] for month in body["months"]) == mato_grosso["modis"]


def test_invalid_state_code_is_rejected():
    assert client.get("/export/monthly", params={**PARAMS, "state": "MT"}).status_code == 422
