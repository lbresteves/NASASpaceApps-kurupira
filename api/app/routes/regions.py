from pathlib import Path

import duckdb
from fastapi import APIRouter
from pydantic import BaseModel

from app.hotspot_data import METRIC_COLUMNS, STATE_DATA_FILE, Metric
from app.query_params import MonthList, YearList

router = APIRouter(tags=["regions"])


class PeakMonth(BaseModel):
    year: int
    month: int
    hotspots: float


class AreaTotals(BaseModel):
    modis: int
    viirs: int
    harmonized: float
    peak: PeakMonth | None


class StateSummary(AreaTotals):
    code: str
    abbreviation: str
    name: str
    region: str


class RegionSummaryResponse(BaseModel):
    metric: Metric
    brazil: AreaTotals
    states: list[StateSummary]


def to_peak(peak_period: dict | None, peak_value: float | None) -> PeakMonth | None:
    return PeakMonth(**peak_period, hotspots=round(float(peak_value), 2)) if peak_value else None


def read_brazil_totals(
    years: list[int], months: list[int], metric: Metric, data_file: Path = STATE_DATA_FILE
) -> AreaTotals:
    peak_column = METRIC_COLUMNS[metric]
    sql = f"""
        WITH monthly AS (
            SELECT
                year,
                month,
                sum(modis_hotspots) AS modis_hotspots,
                sum(viirs_snpp_hotspots) AS viirs_snpp_hotspots,
                sum(fusion_index_modis_equivalent) AS fusion_index_modis_equivalent
            FROM read_parquet($file)
            WHERE list_contains($years, year) AND list_contains($months, month)
            GROUP BY year, month
        )
        SELECT
            coalesce(sum(modis_hotspots), 0),
            coalesce(sum(viirs_snpp_hotspots), 0),
            coalesce(sum(fusion_index_modis_equivalent), 0),
            arg_max(struct_pack(year := year, month := month), {peak_column}),
            max({peak_column})
        FROM monthly
    """
    with duckdb.connect() as connection:
        params = {"file": str(data_file), "years": years, "months": months}
        modis, viirs, harmonized, peak_period, peak_value = connection.execute(sql, params).fetchall()[0]

    return AreaTotals(
        modis=int(modis),
        viirs=int(viirs),
        harmonized=round(float(harmonized), 2),
        peak=to_peak(peak_period, peak_value),
    )


def read_state_summaries(
    years: list[int], months: list[int], metric: Metric, data_file: Path = STATE_DATA_FILE
) -> list[StateSummary]:
    peak_column = METRIC_COLUMNS[metric]
    sql = f"""
        WITH states AS (
            SELECT DISTINCT state_code, state_abbreviation, state_name, region FROM read_parquet($file)
        ),
        filtered AS (
            SELECT * FROM read_parquet($file)
            WHERE list_contains($years, year) AND list_contains($months, month)
        )
        SELECT
            states.state_code,
            states.state_abbreviation,
            states.state_name,
            states.region,
            coalesce(sum(filtered.modis_hotspots), 0),
            coalesce(sum(filtered.viirs_snpp_hotspots), 0),
            coalesce(sum(filtered.fusion_index_modis_equivalent), 0),
            arg_max(struct_pack(year := filtered.year, month := filtered.month), filtered.{peak_column}),
            max(filtered.{peak_column})
        FROM states
        LEFT JOIN filtered USING (state_code)
        GROUP BY ALL
        ORDER BY states.state_code
    """
    with duckdb.connect() as connection:
        rows = connection.execute(sql, {"file": str(data_file), "years": years, "months": months}).fetchall()

    return [
        StateSummary(
            code=code,
            abbreviation=abbreviation,
            name=name,
            region=region,
            modis=int(modis),
            viirs=int(viirs),
            harmonized=round(float(harmonized), 2),
            peak=to_peak(peak_period, peak_value),
        )
        for code, abbreviation, name, region, modis, viirs, harmonized, peak_period, peak_value in rows
    ]


@router.get("/regions/summary")
def read_region_summary(
    years: YearList, months: MonthList, metric: Metric = Metric.harmonized
) -> RegionSummaryResponse:
    return RegionSummaryResponse(
        metric=metric,
        brazil=read_brazil_totals(years, months, metric),
        states=read_state_summaries(years, months, metric),
    )
