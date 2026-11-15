import duckdb
import pytest
from fastapi.testclient import TestClient

from app.hotspot_data import DATA_FILE
from app.main import app

client = TestClient(app)


def get_summary(**params):
    response = client.get("/regions/summary", params=params)
    assert response.status_code == 200
    return response.json()


def test_every_state_is_listed_even_without_hotspots():
    states = get_summary(years=[2024], months=[9])["states"]

    assert len(states) == 27
    assert {state["abbreviation"] for state in states} >= {"MT", "PA", "SP", "DF"}


def test_state_totals_add_up_to_the_grid_total():
    expected = duckdb.sql(
        f"SELECT sum(modis_hotspots) FROM read_parquet('{DATA_FILE.as_posix()}') WHERE year = 2024 AND month = 9"
    ).fetchall()[0][0]

    states = get_summary(years=[2024], months=[9])["states"]

    assert sum(state["modis"] for state in states) == expected


def test_peak_is_the_month_with_the_most_hotspots_of_the_chosen_metric():
    mato_grosso = next(
        state for state in get_summary(years=[2024], months=[1, 9], metric="modis")["states"] if state["code"] == "51"
    )
    single_months = {
        month: next(state for state in get_summary(years=[2024], months=[month])["states"] if state["code"] == "51")
        for month in (1, 9)
    }

    peak_month = max(single_months, key=lambda month: single_months[month]["modis"])
    assert mato_grosso["peak"]["month"] == peak_month
    assert mato_grosso["peak"]["hotspots"] == pytest.approx(single_months[peak_month]["modis"])


def test_route_rejects_values_outside_the_data():
    assert client.get("/regions/summary", params={"years": [2030], "months": [1]}).status_code == 422


def test_brazil_totals_are_the_sum_of_the_states_with_a_national_peak():
    body = get_summary(years=[2024], months=[8, 9], metric="modis")

    assert body["brazil"]["modis"] == sum(state["modis"] for state in body["states"])
    assert body["brazil"]["peak"]["month"] == 9
    assert body["brazil"]["peak"]["hotspots"] == get_summary(years=[2024], months=[9])["brazil"]["modis"]
