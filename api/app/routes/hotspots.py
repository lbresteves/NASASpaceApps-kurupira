from pathlib import Path
from typing import Any

import duckdb
from fastapi import APIRouter

from app.hotspot_data import CELL_STATES_FILE, DATA_FILE
from app.query_params import MonthList, StateCode, YearList

router = APIRouter(tags=["hotspots"])

CELLS_SQL = """
    SELECT
        cells.latitude,
        cells.longitude,
        sum(cells.modis_hotspots) AS modis,
        sum(cells.viirs_snpp_hotspots) AS viirs,
        sum(cells.fusion_index_modis_equivalent) AS harmonized
    FROM read_parquet($cells) AS cells
    JOIN read_parquet($cell_states) AS cell_states USING (cell_lat_id, cell_lon_id)
    WHERE list_contains($years, cells.year)
        AND list_contains($months, cells.month)
        AND ($state IS NULL OR cell_states.state_code = $state)
    GROUP BY cells.latitude, cells.longitude
    HAVING sum(cells.modis_hotspots) > 0 OR sum(cells.viirs_snpp_hotspots) > 0
"""


def read_cells(
    years: list[int],
    months: list[int],
    state: str | None = None,
    data_file: Path = DATA_FILE,
    cell_states_file: Path = CELL_STATES_FILE,
) -> list[tuple]:
    params = {
        "cells": str(data_file),
        "cell_states": str(cell_states_file),
        "years": years,
        "months": months,
        "state": state,
    }
    with duckdb.connect() as connection:
        return connection.execute(CELLS_SQL, params).fetchall()


def to_feature_collection(rows: list[tuple]) -> dict[str, Any]:
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
                "properties": {"modis": int(modis), "viirs": int(viirs), "harmonized": round(float(harmonized), 2)},
            }
            for latitude, longitude, modis, viirs, harmonized in rows
        ],
    }


@router.get("/hotspots")
def read_hotspots(years: YearList, months: MonthList, state: StateCode = None) -> dict[str, Any]:
    return to_feature_collection(read_cells(years, months, state))
