from fastapi.testclient import TestClient

from app.main import app
from app.routes.hotspots import read_cells, to_feature_collection

client = TestClient(app)


def test_rows_become_geojson_points_in_lon_lat_order():
    collection = to_feature_collection([(-14.875, -55.875, 2.123)])

    feature = collection["features"][0]
    assert collection["type"] == "FeatureCollection"
    assert feature["geometry"]["coordinates"] == [-55.875, -14.875]
    assert feature["properties"] == {"hotspots": 2.12}


def test_cells_are_summed_over_the_selected_months():
    one_month = {(lat, lon): value for lat, lon, value in read_cells("modis", [2024], [9])}
    two_months = {(lat, lon): value for lat, lon, value in read_cells("modis", [2024], [8, 9])}

    assert sum(two_months.values()) > sum(one_month.values())


def test_route_returns_the_cells_of_a_month():
    response = client.get("/hotspots", params={"years": [2012], "months": [1]})

    assert response.status_code == 200
    features = response.json()["features"]
    assert len(features) > 0
    assert features[0]["properties"]["hotspots"] > 0


def test_route_accepts_each_metric():
    for metric in ("modis", "viirs", "harmonized"):
        response = client.get("/hotspots", params={"years": [2024], "months": [9], "metric": metric})
        assert response.status_code == 200


def test_route_rejects_values_outside_the_data():
    assert client.get("/hotspots", params={"years": [2030], "months": [1]}).status_code == 422
    assert client.get("/hotspots", params={"years": [2025], "months": [13]}).status_code == 422
    assert client.get("/hotspots", params={"years": [2025], "months": [1], "metric": "goes"}).status_code == 422
