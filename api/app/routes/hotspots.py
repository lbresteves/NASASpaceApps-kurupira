from pathlib import Path
from typing import Any

import duckdb
from fastapi import APIRouter, Query

router = APIRouter(tags=["hotspots"])

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "brazil_cell_monthly_2012_2025.parquet"
FIRST_YEAR = 2012
LAST_YEAR = 2025

MONTH_CELLS_SQL = """
    SELECT latitude, longitude, modis_hotspots, viirs_snpp_hotspots, fusion_index_modis_equivalent
    FROM read_parquet(?)
    WHERE year = ? AND month = ?
    ORDER BY fusion_index_modis_equivalent
"""


def read_month_cells(year: int, month: int, data_file: Path = DATA_FILE) -> list[tuple]:
    with duckdb.connect() as connection:
        return connection.execute(MONTH_CELLS_SQL, [str(data_file), year, month]).fetchall()


def to_feature_collection(rows: list[tuple]) -> dict[str, Any]:
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
                "properties": {
                    "modis_hotspots": int(modis),
                    "viirs_snpp_hotspots": int(viirs),
                    "harmonized_hotspots": round(float(harmonized), 2),
                },
            }
            for latitude, longitude, modis, viirs, harmonized in rows
        ],
    }


@router.get("/hotspots")
def read_hotspots(
    year: int = Query(ge=FIRST_YEAR, le=LAST_YEAR),
    month: int = Query(ge=1, le=12),
) -> dict[str, Any]:
    return to_feature_collection(read_month_cells(year, month))
