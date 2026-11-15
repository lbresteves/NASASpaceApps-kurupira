import pandas as pd
import pytest
from shapely.geometry import box

from pipeline.build_state_aggregates import aggregate_state_month, assign_cells_to_states

GEOMETRIES = [box(0, 0, 1, 1), box(1, 0, 2, 1)]
ATTRIBUTES = pd.DataFrame(
    {
        "state_code": ["11", "12"],
        "state_abbreviation": ["AA", "BB"],
        "state_name": ["West", "East"],
        "region": ["Norte", "Norte"],
    }
)


def cell(year, month, lat_id, lon_id, latitude, longitude, modis, viirs):
    return {
        "year": year,
        "month": month,
        "cell_lat_id": lat_id,
        "cell_lon_id": lon_id,
        "latitude": latitude,
        "longitude": longitude,
        "modis_hotspots": modis,
        "viirs_snpp_hotspots": viirs,
        "viirs_modis_equivalent_hotspots": viirs / 4,
        "fusion_index_modis_equivalent": (modis + viirs / 4) / 2,
        "days_with_hotspots": 1,
    }


def test_cells_take_the_state_that_contains_their_center():
    cells = pd.DataFrame({"latitude": [0.5, 0.5], "longitude": [0.5, 1.5]})
    assert assign_cells_to_states(cells, GEOMETRIES).tolist() == [0, 1]


def test_cells_outside_every_state_take_the_nearest_one():
    cells = pd.DataFrame({"latitude": [0.5], "longitude": [2.2]})
    assert assign_cells_to_states(cells, GEOMETRIES).tolist() == [1]


def test_cells_far_from_every_state_fail():
    cells = pd.DataFrame({"latitude": [5.0], "longitude": [5.0]})
    with pytest.raises(ValueError):
        assign_cells_to_states(cells, GEOMETRIES)


def test_state_totals_add_up_to_the_cell_totals():
    cell_monthly = pd.DataFrame(
        [
            cell(2020, 8, 1, 1, 0.5, 0.25, 10, 40),
            cell(2020, 8, 1, 2, 0.5, 0.75, 2, 0),
            cell(2020, 8, 1, 3, 0.5, 1.5, 5, 8),
            cell(2020, 9, 1, 1, 0.5, 0.25, 1, 4),
        ]
    )

    states = aggregate_state_month(cell_monthly, GEOMETRIES, ATTRIBUTES)

    august_west = states.query("year == 2020 and month == 8 and state_code == '11'").iloc[0]
    assert august_west["modis_hotspots"] == 12
    assert august_west["viirs_snpp_hotspots"] == 40
    assert august_west["cells_with_hotspots"] == 2
    assert states["modis_hotspots"].sum() == cell_monthly["modis_hotspots"].sum()
    assert states["fusion_index_modis_equivalent"].sum() == pytest.approx(
        cell_monthly["fusion_index_modis_equivalent"].sum()
    )
