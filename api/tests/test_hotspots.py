from fastapi.testclient import TestClient

from app.main import app
from app.routes.hotspots import read_cells, to_feature_collection

client = TestClient(app)


def test_rows_become_geojson_points_with_every_sensor_value():
    collection = to_feature_collection([(-14.875, -55.875, 2, 8, 2.123)])

    feature = collection["features"][0]
    assert collection["type"] == "FeatureCollection"
    assert feature["geometry"]["coordinates"] == [-55.875, -14.875]
    assert feature["properties"] == {"modis": 2, "viirs": 8, "harmonized": 2.12}


def test_cells_are_summed_over_the_selected_months():
    one_month = sum(row[2] for row in read_cells([2024], [9]))
    two_months = sum(row[2] for row in read_cells([2024], [8, 9]))

    assert two_months > one_month


def test_cells_without_any_detection_are_left_out():
    assert all(modis > 0 or viirs > 0 for _, _, modis, viirs, _ in read_cells([2024], [9]))


def test_route_returns_the_cells_of_a_month():
    response = client.get("/hotspots", params={"years": [2012], "months": [1]})

    assert response.status_code == 200
    features = response.json()["features"]
    assert len(features) > 0
    assert set(features[0]["properties"]) == {"modis", "viirs", "harmonized"}


def test_route_rejects_values_outside_the_data():
    assert client.get("/hotspots", params={"years": [2030], "months": [1]}).status_code == 422
    assert client.get("/hotspots", params={"years": [2025], "months": [13]}).status_code == 422


def test_state_filter_keeps_only_the_cells_of_that_state():
    brazil = read_cells([2024], [9])
    mato_grosso = read_cells([2024], [9], state="51")

    assert 0 < len(mato_grosso) < len(brazil)
    assert all(-19 < latitude < -7 and -62 < longitude < -50 for latitude, longitude, *_ in mato_grosso)
