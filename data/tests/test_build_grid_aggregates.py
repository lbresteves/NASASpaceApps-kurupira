import pandas as pd
import pytest

from pipeline.build_grid_aggregates import aggregate_cell_month, aggregate_daily, check_fusion_index, rename_grid


def make_raw(rows):
    base = {
        "ano": 2025,
        "mes": 8,
        "acq_date": "2025-08-01",
        "grade_lat_id": -60,
        "grade_lon_id": -224,
        "latitude_centro": -14.875,
        "longitude_centro": -55.875,
        "modis_deteccoes": 2,
        "viirs_snpp_deteccoes": 8,
        "viirs_equivalente_modis_estimado": 2.0,
        "indice_fusao_experimental_modis_eq": 2.0,
        "conjunto": "AJUSTE",
    }
    return pd.DataFrame([{**base, **row} for row in rows])


def test_rename_keeps_only_used_columns_in_english():
    grid = rename_grid(make_raw([{}]))

    assert "conjunto" not in grid.columns
    assert {"latitude", "longitude", "modis_hotspots", "fusion_index_modis_equivalent"} <= set(grid.columns)


def test_cell_month_sums_days_of_the_same_cell():
    grid = rename_grid(make_raw([{"acq_date": "2025-08-01"}, {"acq_date": "2025-08-02", "modis_deteccoes": 4}]))

    monthly = aggregate_cell_month(grid)

    assert len(monthly) == 1
    assert monthly.loc[0, "modis_hotspots"] == 6
    assert monthly.loc[0, "days_with_hotspots"] == 2


def test_daily_sums_cells_of_the_same_day():
    grid = rename_grid(make_raw([{}, {"grade_lat_id": -61, "latitude_centro": -15.125}]))

    daily = aggregate_daily(grid)

    assert len(daily) == 1
    assert daily.loc[0, "viirs_snpp_hotspots"] == 16
    assert daily.loc[0, "cells_with_hotspots"] == 2


def test_check_rejects_a_wrong_fusion_index():
    grid = rename_grid(make_raw([{"indice_fusao_experimental_modis_eq": 9.0}]))

    with pytest.raises(ValueError, match="Fusion index"):
        check_fusion_index(grid)
