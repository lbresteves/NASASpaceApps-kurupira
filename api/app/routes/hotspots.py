from pathlib import Path
from typing import Annotated, Any

import duckdb
from fastapi import APIRouter, Query

from app.hotspot_data import DATA_FILE, FIRST_YEAR, LAST_YEAR, METRIC_COLUMNS, Metric

router = APIRouter(tags=["hotspots"])

YearList = Annotated[list[Annotated[int, Query(ge=FIRST_YEAR, le=LAST_YEAR)]], Query()]
MonthList = Annotated[list[Annotated[int, Query(ge=1, le=12)]], Query()]


def read_cells(metric: Metric, years: list[int], months: list[int], data_file: Path = DATA_FILE) -> list[tuple]:
    column = METRIC_COLUMNS[metric]
    sql = f"""
        SELECT latitude, longitude, sum({column}) AS hotspots
        FROM read_parquet(?)
        WHERE list_contains(?, year) AND list_contains(?, month)
        GROUP BY latitude, longitude
        HAVING sum({column}) > 0
        ORDER BY hotspots
    """
    with duckdb.connect() as connection:
        return connection.execute(sql, [str(data_file), years, months]).fetchall()


def to_feature_collection(rows: list[tuple]) -> dict[str, Any]:
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
                "properties": {"hotspots": round(float(hotspots), 2)},
            }
            for latitude, longitude, hotspots in rows
        ],
    }


@router.get("/hotspots")
def read_hotspots(years: YearList, months: MonthList, metric: Metric = Metric.harmonized) -> dict[str, Any]:
    return to_feature_collection(read_cells(metric, years, months))
