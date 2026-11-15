import csv
import io
from enum import StrEnum
from pathlib import Path

import duckdb
from fastapi import APIRouter
from fastapi.responses import Response
from pydantic import BaseModel

from app.hotspot_data import STATE_DATA_FILE
from app.query_params import MonthList, StateCode, YearList

router = APIRouter(tags=["export"])

EXCEL_UTF8_BOM = "﻿"

BRAZIL_AREA = "Brazil"


class ExportFormat(StrEnum):
    csv = "csv"
    json = "json"


class ExportMonth(BaseModel):
    year: int
    month: int
    area: str
    modis_hotspots: int
    viirs_snpp_hotspots: int
    viirs_modis_equivalent_hotspots: float
    harmonized_hotspots_modis_equivalent: float


class ExportResponse(BaseModel):
    area: str
    months: list[ExportMonth]


EXPORT_SQL = """
    SELECT
        year,
        month,
        any_value(state_name),
        sum(modis_hotspots),
        sum(viirs_snpp_hotspots),
        sum(viirs_modis_equivalent_hotspots),
        sum(fusion_index_modis_equivalent)
    FROM read_parquet($file)
    WHERE list_contains($years, year)
        AND list_contains($months, month)
        AND ($state IS NULL OR state_code = $state)
    GROUP BY year, month
    ORDER BY year, month
"""


def read_export_months(
    years: list[int], months: list[int], state: str | None = None, data_file: Path = STATE_DATA_FILE
) -> list[ExportMonth]:
    params = {"file": str(data_file), "years": years, "months": months, "state": state}
    with duckdb.connect() as connection:
        rows = connection.execute(EXPORT_SQL, params).fetchall()

    return [
        ExportMonth(
            year=year,
            month=month,
            area=state_name if state else BRAZIL_AREA,
            modis_hotspots=int(modis),
            viirs_snpp_hotspots=int(viirs),
            viirs_modis_equivalent_hotspots=round(float(viirs_equivalent), 2),
            harmonized_hotspots_modis_equivalent=round(float(harmonized), 2),
        )
        for year, month, state_name, modis, viirs, viirs_equivalent, harmonized in rows
    ]


def to_csv(rows: list[ExportMonth]) -> str:
    buffer = io.StringIO()
    writer = csv.DictWriter(buffer, fieldnames=list(ExportMonth.model_fields), lineterminator="\n")
    writer.writeheader()
    writer.writerows(row.model_dump() for row in rows)
    return EXCEL_UTF8_BOM + buffer.getvalue()


def build_file_name(years: list[int], state: str | None) -> str:
    area = f"state-{state}" if state else "brazil"
    return f"kurupira_hotspots_{area}_{min(years)}-{max(years)}.csv"


@router.get("/export/monthly", response_model=None)
def export_monthly(
    years: YearList,
    months: MonthList,
    state: StateCode = None,
    format: ExportFormat = ExportFormat.csv,
) -> ExportResponse | Response:
    rows = read_export_months(years, months, state)
    if format == ExportFormat.json:
        return ExportResponse(area=rows[0].area if rows else BRAZIL_AREA, months=rows)

    return Response(
        content=to_csv(rows),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{build_file_name(years, state)}"'},
    )
