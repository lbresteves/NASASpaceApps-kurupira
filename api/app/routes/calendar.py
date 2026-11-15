from functools import lru_cache
from pathlib import Path

import duckdb
from fastapi import APIRouter
from pydantic import BaseModel

from app.hotspot_data import METRIC_COLUMNS, STATE_DATA_FILE, Metric
from app.query_params import StateCode

router = APIRouter(tags=["calendar"])

STATE_COUNT = 27


class CalendarMonth(BaseModel):
    year: int
    month: int
    hotspots: float


class CalendarResponse(BaseModel):
    metric: Metric
    state: str | None
    months: list[CalendarMonth]


def read_monthly_totals(
    metric: Metric, state: str | None = None, data_file: Path = STATE_DATA_FILE
) -> list[CalendarMonth]:
    column = METRIC_COLUMNS[metric]
    sql = f"""
        SELECT year, month, sum({column}) AS hotspots
        FROM read_parquet($file)
        WHERE $state IS NULL OR state_code = $state
        GROUP BY year, month
        ORDER BY year, month
    """
    with duckdb.connect() as connection:
        rows = connection.execute(sql, {"file": str(data_file), "state": state}).fetchall()
    return [CalendarMonth(year=year, month=month, hotspots=round(float(total), 2)) for year, month, total in rows]


@lru_cache(maxsize=len(Metric) * (STATE_COUNT + 1))
def get_calendar(metric: Metric, state: str | None) -> CalendarResponse:
    return CalendarResponse(metric=metric, state=state, months=read_monthly_totals(metric, state))


@router.get("/calendar")
def read_calendar(metric: Metric = Metric.harmonized, state: StateCode = None) -> CalendarResponse:
    return get_calendar(metric, state)
