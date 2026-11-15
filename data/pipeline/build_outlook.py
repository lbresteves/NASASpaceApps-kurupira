"""Build the API files for the December/January outlook from the two IGNIS files sent by the data team.

- Forecast (Dec 2026 - Jan 2027): a historical analog per cell and day, plus a national Random Forest model.
  The local values are the 2012-2025 average of the same calendar day; they are not a calibrated fire probability.
- Comparison (Dec/Jan 2012-2025): observed cell-days, compared here with the cell's average for the same month.

Both are summed per cell and month so the map shows one value per cell.
"""

import argparse
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).resolve().parent.parent
API_DATA_DIR = DATA_DIR.parent / "api" / "data"
DEFAULT_FORECAST_INPUT = DATA_DIR / "raw" / "IGNIS_previsao_hotspots_diaria_dez2026_jan2027.csv"
DEFAULT_COMPARISON_INPUT = DATA_DIR / "raw" / "IGNIS_comparacao_historica_dez_jan_2012_2025.csv"
DEFAULT_FORECAST_CELLS_OUTPUT = API_DATA_DIR / "outlook_forecast_cells_2026_2027.parquet"
DEFAULT_FORECAST_DAILY_OUTPUT = API_DATA_DIR / "outlook_forecast_daily_2026_2027.parquet"
DEFAULT_COMPARISON_OUTPUT = API_DATA_DIR / "outlook_comparison_cells_dec_jan_2012_2025.parquet"

CSV_OPTIONS = {"sep": ";", "decimal": ",", "encoding": "utf-8-sig"}

FORECAST_COLUMNS = {
    "data_previsao": "date",
    "latitude": "latitude",
    "longitude": "longitude",
    "probabilidade_historica_deteccao_hotspot_celula_pct": "detection_frequency_pct",
    "media_historica_indice_fusao_mes_dia": "expected_hotspots",
    "regiao_critica_top10pct_historico": "is_critical",
    "estimativa_total_nacional_indice_fusao": "national_estimate",
    "limite_inferior_80_aproximado_total_nacional": "national_lower_80",
    "limite_superior_80_aproximado_total_nacional": "national_upper_80",
    "probabilidade_modelo_atividade_alta_nacional_pct": "high_activity_probability_pct",
    "limiar_nacional_atividade_alta_P80": "high_activity_threshold",
}

NATIONAL_FORECAST_COLUMNS = [
    "national_estimate",
    "national_lower_80",
    "national_upper_80",
    "high_activity_probability_pct",
    "high_activity_threshold",
]

COMPARISON_COLUMNS = {
    "ano": "year",
    "mes": "month",
    "latitude": "latitude",
    "longitude": "longitude",
    "indice_fusao_celula_dia": "observed",
}

CELL_KEYS = ["latitude", "longitude"]


def read_ignis_csv(path: Path, columns: dict[str, str]) -> pd.DataFrame:
    return pd.read_csv(path, usecols=list(columns), **CSV_OPTIONS).rename(columns=columns)


def add_year_month(daily: pd.DataFrame) -> pd.DataFrame:
    dates = pd.to_datetime(daily["date"], format="%Y-%m-%d")
    return daily.assign(year=dates.dt.year, month=dates.dt.month, days_in_month=dates.dt.days_in_month)


def aggregate_forecast_cells(forecast: pd.DataFrame) -> pd.DataFrame:
    """One row per cell and month. Days without a row had no historical detection, so they count as 0%."""
    forecast = add_year_month(forecast)
    keys = ["year", "month", *CELL_KEYS]
    grouped = forecast.groupby(keys, as_index=False).agg(
        expected_hotspots=("expected_hotspots", "sum"),
        detection_frequency_sum=("detection_frequency_pct", "sum"),
        critical_days=("is_critical", "sum"),
        days_in_month=("days_in_month", "first"),
    )
    grouped["mean_detection_frequency_pct"] = grouped["detection_frequency_sum"] / grouped["days_in_month"]
    grouped["critical_days"] = grouped["critical_days"].astype("int16")
    columns = [*keys, "expected_hotspots", "mean_detection_frequency_pct", "critical_days"]
    return grouped[columns].sort_values(keys, ignore_index=True)


def aggregate_forecast_daily(forecast: pd.DataFrame) -> pd.DataFrame:
    """The national values repeat on every cell of a date; keep one row per date and fail if they disagree."""
    daily = forecast.groupby("date")[NATIONAL_FORECAST_COLUMNS]
    if (daily.nunique() > 1).any().any():
        raise ValueError("National forecast values differ between cells of the same date.")
    national = daily.first().reset_index()
    national["date"] = pd.to_datetime(national["date"], format="%Y-%m-%d").dt.date
    return national.sort_values("date", ignore_index=True)


def aggregate_comparison_cells(comparison: pd.DataFrame) -> pd.DataFrame:
    """Observed total per cell and month, next to that cell's average for the same month across all years.

    A cell-month without rows had no detection, so it is filled with 0 before averaging; otherwise the
    average would only count the years with detections and every anomaly would lean negative.
    """
    keys = ["year", "month", *CELL_KEYS]
    monthly = comparison.groupby(keys, as_index=False)["observed"].sum()

    cells = monthly[["month", *CELL_KEYS]].drop_duplicates()
    years = pd.DataFrame({"year": sorted(monthly["year"].unique())})
    result = cells.merge(years, how="cross").merge(monthly, on=keys, how="left").fillna({"observed": 0.0})
    result["average"] = result.groupby(["month", *CELL_KEYS])["observed"].transform("mean")
    result["anomaly"] = result["observed"] - result["average"]
    columns = ["year", "month", *CELL_KEYS, "observed", "average", "anomaly"]
    return result[columns].sort_values(["year", "month", *CELL_KEYS], ignore_index=True)


def save(df: pd.DataFrame, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(output, index=False)
    print(f"Saved {len(df):,} rows to {output} ({output.stat().st_size / 1_000_000:.1f} MB)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the Dec/Jan outlook API files from the IGNIS CSVs.")
    parser.add_argument("--forecast-input", type=Path, default=DEFAULT_FORECAST_INPUT)
    parser.add_argument("--comparison-input", type=Path, default=DEFAULT_COMPARISON_INPUT)
    parser.add_argument("--forecast-cells-output", type=Path, default=DEFAULT_FORECAST_CELLS_OUTPUT)
    parser.add_argument("--forecast-daily-output", type=Path, default=DEFAULT_FORECAST_DAILY_OUTPUT)
    parser.add_argument("--comparison-output", type=Path, default=DEFAULT_COMPARISON_OUTPUT)
    args = parser.parse_args()

    forecast = read_ignis_csv(args.forecast_input, FORECAST_COLUMNS)
    save(aggregate_forecast_cells(forecast), args.forecast_cells_output)
    save(aggregate_forecast_daily(forecast), args.forecast_daily_output)

    comparison = read_ignis_csv(args.comparison_input, COMPARISON_COLUMNS)
    save(aggregate_comparison_cells(comparison), args.comparison_output)


if __name__ == "__main__":
    main()
