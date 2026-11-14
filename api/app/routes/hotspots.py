from pathlib import Path
from typing import Annotated, Any

import duckdb
from fastapi import APIRouter, Query

from app.hotspot_data import DATA_FILE, FIRST_YEAR, LAST_YEAR

router = APIRouter(tags=["hotspots"])

YearList = Annotated[list[Annotated[int, Query(ge=FIRST_YEAR, le=LAST_YEAR)]], Query()]
MonthList = Annotated[list[Annotated[int, Query(ge=1, le=12)]], Query()]

CELLS_SQL = """
    SELECT
        latitude,
        longitude,
        sum(modis_hotspots) AS modis,
        sum(viirs_snpp_hotspots) AS viirs,
        sum(fusion_index_modis_equivalent) AS harmonized
    FROM read_parquet(?)
    WHERE list_contains(?, year) AND list_contains(?, month)
    GROUP BY latitude, longitude
    HAVING sum(modis_hotspots) > 0 OR sum(viirs_snpp_hotspots) > 0
"""


def read_cells(years: list[int], months: list[int], data_file: Path = DATA_FILE) -> list[tuple]:
    with duckdb.connect() as connection:
        return connection.execute(CELLS_SQL, [str(data_file), years, months]).fetchall()


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
def read_hotspots(years: YearList, months: MonthList) -> dict[str, Any]:
    return to_feature_collection(read_cells(years, months))
