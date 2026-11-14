from functools import lru_cache
from pathlib import Path

import duckdb
from fastapi import APIRouter
from pydantic import BaseModel

from app.hotspot_data import DATA_FILE, METRIC_COLUMNS, Metric

router = APIRouter(tags=["calendar"])


class CalendarMonth(BaseModel):
    year: int
    month: int
    hotspots: float


class CalendarResponse(BaseModel):
    metric: Metric
    months: list[CalendarMonth]


def read_monthly_totals(metric: Metric, data_file: Path = DATA_FILE) -> list[CalendarMonth]:
    column = METRIC_COLUMNS[metric]
    sql = f"""
        SELECT year, month, sum({column}) AS hotspots
        FROM read_parquet(?)
        GROUP BY year, month
        ORDER BY year, month
    """
    with duckdb.connect() as connection:
        rows = connection.execute(sql, [str(data_file)]).fetchall()
    return [CalendarMonth(year=year, month=month, hotspots=round(float(total), 2)) for year, month, total in rows]


@lru_cache(maxsize=len(Metric))
def get_calendar(metric: Metric) -> CalendarResponse:
    return CalendarResponse(metric=metric, months=read_monthly_totals(metric))


@router.get("/calendar")
def read_calendar(metric: Metric = Metric.harmonized) -> CalendarResponse:
    return get_calendar(metric)
