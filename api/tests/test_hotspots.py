from fastapi.testclient import TestClient

from app.main import app
from app.routes.hotspots import to_feature_collection

client = TestClient(app)


def test_rows_become_geojson_points_in_lon_lat_order():
    collection = to_feature_collection([(-14.875, -55.875, 2, 8, 2.123)])

    feature = collection["features"][0]
    assert collection["type"] == "FeatureCollection"
    assert feature["geometry"]["coordinates"] == [-55.875, -14.875]
    assert feature["properties"] == {"modis_hotspots": 2, "viirs_snpp_hotspots": 8, "harmonized_hotspots": 2.12}


def test_route_returns_the_cells_of_a_month():
    response = client.get("/hotspots", params={"year": 2012, "month": 1})

    assert response.status_code == 200
    features = response.json()["features"]
    assert len(features) > 0
    assert set(features[0]["properties"]) == {"modis_hotspots", "viirs_snpp_hotspots", "harmonized_hotspots"}


def test_route_rejects_a_month_outside_the_data():
    assert client.get("/hotspots", params={"year": 2030, "month": 1}).status_code == 422
    assert client.get("/hotspots", params={"year": 2025, "month": 13}).status_code == 422
