"""December/January outlook: the IGNIS forecast for Dec 2026 - Jan 2027 and past Dec/Jan months vs their average.

Values are the experimental fusion index (MODIS-equivalent hotspots), summed per ~28 km cell and month.
Built by `data/pipeline/build_outlook.py`.
"""

from pathlib import Path
from typing import Annotated, Any

import duckdb
from fastapi import APIRouter, HTTPException, Query

from app.hotspot_data import DATA_DIR

FORECAST_CELLS_FILE = DATA_DIR / "outlook_forecast_cells_2026_2027.parquet"
FORECAST_DAILY_FILE = DATA_DIR / "outlook_forecast_daily_2026_2027.parquet"
COMPARISON_CELLS_FILE = DATA_DIR / "outlook_comparison_cells_dec_jan_2012_2025.parquet"

Period = Annotated[str, Query(pattern=r"^\d{4}-(0[1-9]|1[0-2])$", description="Month as YYYY-MM, e.g. 2026-12")]

FORECAST_CELLS_SQL = """
    SELECT latitude, longitude, expected_hotspots, mean_detection_frequency_pct, critical_days
    FROM read_parquet($cells)
    WHERE year = $year AND month = $month AND expected_hotspots > 0
"""

FORECAST_SUMMARY_SQL = """
    SELECT
        count(*) AS days,
        sum(national_estimate) AS expected_total,
        min(national_estimate) AS daily_min,
        max(national_estimate) AS daily_max,
        max(high_activity_threshold) AS high_activity_threshold,
        max(high_activity_probability_pct) AS high_activity_probability_max_pct,
        arg_max(date, high_activity_probability_pct) AS high_activity_peak_date
    FROM read_parquet($daily)
    WHERE year(date) = $year AND month(date) = $month
"""

COMPARISON_CELLS_SQL = """
    SELECT latitude, longitude, observed, average, anomaly
    FROM read_parquet($cells)
    WHERE year = $year AND month = $month AND (observed > 0 OR average > 0)
"""


FORECAST_MONTHS_SQL = """
    SELECT year(date) AS year, month(date) AS month, sum(national_estimate) AS expected_total
    FROM read_parquet($daily)
    GROUP BY ALL
    ORDER BY year, month
"""

COMPARISON_MONTHS_SQL = """
    SELECT year, month, sum(observed) AS observed_total, sum(average) AS average_total
    FROM read_parquet($cells)
    GROUP BY ALL
    ORDER BY year, month
"""


def to_period(year: int, month: int) -> str:
    return f"{year}-{month:02d}"


def anomaly_pct(observed_total: float, average_total: float) -> float | None:
    return round((observed_total / average_total - 1) * 100, 1) if average_total else None


def read_outlook_months(
    daily_file: Path = FORECAST_DAILY_FILE, cells_file: Path = COMPARISON_CELLS_FILE
) -> dict[str, list[dict[str, Any]]]:
    forecast = query(FORECAST_MONTHS_SQL, {"daily": str(daily_file)})
    comparison = query(COMPARISON_MONTHS_SQL, {"cells": str(cells_file)})
    return {
        "forecast": [
            {"period": to_period(year, month), "expected_total": round(total)} for year, month, total in forecast
        ],
        "comparison": [
            {
                "period": to_period(year, month),
                "observed_total": round(observed),
                "average_total": round(average),
                "anomaly_pct": anomaly_pct(observed, average),
            }
            for year, month, observed, average in comparison
        ],
    }


def parse_period(period: str) -> tuple[int, int]:
    year, month = period.split("-")
    return int(year), int(month)


def query(sql: str, params: dict[str, Any]) -> list[tuple]:
    with duckdb.connect() as connection:
        return connection.execute(sql, params).fetchall()


def read_forecast_cells(year: int, month: int, cells_file: Path = FORECAST_CELLS_FILE) -> list[tuple]:
    return query(FORECAST_CELLS_SQL, {"cells": str(cells_file), "year": year, "month": month})


def read_forecast_summary(year: int, month: int, daily_file: Path = FORECAST_DAILY_FILE) -> dict[str, Any] | None:
    rows = query(FORECAST_SUMMARY_SQL, {"daily": str(daily_file), "year": year, "month": month})
    days, total, daily_min, daily_max, threshold, probability, peak_date = rows[0]
    if days == 0:
        return None
    return {
        "days": days,
        "expected_total": round(total),
        "daily_min": round(daily_min),
        "daily_max": round(daily_max),
        "high_activity_threshold": round(threshold),
        "high_activity_probability_max_pct": round(probability, 1),
        "high_activity_peak_date": peak_date.isoformat(),
    }


def read_comparison_cells(year: int, month: int, cells_file: Path = COMPARISON_CELLS_FILE) -> list[tuple]:
    return query(COMPARISON_CELLS_SQL, {"cells": str(cells_file), "year": year, "month": month})


def point(latitude: float, longitude: float, properties: dict[str, Any]) -> dict[str, Any]:
    return {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
        "properties": properties,
    }


def forecast_collection(rows: list[tuple], summary: dict[str, Any]) -> dict[str, Any]:
    return {
        "type": "FeatureCollection",
        "summary": summary,
        "features": [
            point(
                latitude,
                longitude,
                {
                    "expected": round(expected, 2),
                    "detection_pct": round(detection_pct, 1),
                    "critical_days": int(critical_days),
                },
            )
            for latitude, longitude, expected, detection_pct, critical_days in rows
        ],
    }


def comparison_collection(rows: list[tuple]) -> dict[str, Any]:
    observed_total = sum(row[2] for row in rows)
    average_total = sum(row[3] for row in rows)
    return {
        "type": "FeatureCollection",
        "summary": {
            "observed_total": round(observed_total),
            "average_total": round(average_total),
            "anomaly_pct": anomaly_pct(observed_total, average_total),
        },
        "features": [
            point(
                latitude,
                longitude,
                {"observed": round(observed, 2), "average": round(average, 2), "anomaly": round(anomaly, 2)},
            )
            for latitude, longitude, observed, average, anomaly in rows
        ],
    }


router = APIRouter(prefix="/outlook", tags=["outlook"])


@router.get("/months")
def read_months() -> dict[str, list[dict[str, Any]]]:
    """National total of every month that has a forecast or a December/January comparison."""
    return read_outlook_months()


@router.get("/forecast")
def read_forecast(period: Period) -> dict[str, Any]:
    year, month = parse_period(period)
    summary = read_forecast_summary(year, month)
    if summary is None:
        raise HTTPException(status_code=404, detail=f"No forecast for {period}.")
    return forecast_collection(read_forecast_cells(year, month), summary)


@router.get("/comparison")
def read_comparison(period: Period) -> dict[str, Any]:
    year, month = parse_period(period)
    rows = read_comparison_cells(year, month)
    if not rows:
        raise HTTPException(status_code=404, detail=f"No December/January comparison for {period}.")
    return comparison_collection(rows)
