import argparse
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).resolve().parent.parent
API_DATA_DIR = DATA_DIR.parent / "api" / "data"
DEFAULT_INPUT = DATA_DIR / "raw" / "IGNIS_Brasil_GRADE_DIARIA_COM_FRP_EXPERIMENTAL_2012_2025.csv.gz"
DEFAULT_MONTHLY_OUTPUT = API_DATA_DIR / "brazil_cell_monthly_2012_2025.parquet"
DEFAULT_DAILY_OUTPUT = API_DATA_DIR / "brazil_daily_2012_2025.parquet"
CHUNK_ROWS = 1_000_000

COLUMN_NAMES = {
    "ano": "year",
    "mes": "month",
    "acq_date": "date",
    "grade_lat_id": "cell_lat_id",
    "grade_lon_id": "cell_lon_id",
    "latitude_centro": "latitude",
    "longitude_centro": "longitude",
    "modis_deteccoes": "modis_hotspots",
    "viirs_snpp_deteccoes": "viirs_snpp_hotspots",
    "viirs_equivalente_modis_estimado": "viirs_modis_equivalent_hotspots",
    "indice_fusao_experimental_modis_eq": "fusion_index_modis_equivalent",
}

SUM_COLUMNS = [
    "modis_hotspots",
    "viirs_snpp_hotspots",
    "viirs_modis_equivalent_hotspots",
    "fusion_index_modis_equivalent",
]

CELL_MONTH_KEYS = ["year", "month", "cell_lat_id", "cell_lon_id", "latitude", "longitude"]


def rename_grid(raw: pd.DataFrame) -> pd.DataFrame:
    return raw[list(COLUMN_NAMES)].rename(columns=COLUMN_NAMES)


def check_fusion_index(grid: pd.DataFrame) -> None:
    expected = (grid["modis_hotspots"] + grid["viirs_modis_equivalent_hotspots"]) / 2
    off = (grid["fusion_index_modis_equivalent"] - expected).abs() > 0.001
    if off.any():
        raise ValueError(f"Fusion index is not the MODIS / VIIRS-equivalent mean on {off.sum()} rows.")


def aggregate_cell_month(grid: pd.DataFrame) -> pd.DataFrame:
    grouped = grid.groupby(CELL_MONTH_KEYS, as_index=False)
    monthly = grouped[SUM_COLUMNS].sum()
    monthly["days_with_hotspots"] = grouped.size()["size"].to_numpy()
    return monthly


def aggregate_daily(grid: pd.DataFrame) -> pd.DataFrame:
    grouped = grid.groupby("date", as_index=False)
    daily = grouped[SUM_COLUMNS].sum()
    daily["cells_with_hotspots"] = grouped.size()["size"].to_numpy()
    return daily


def build(input_path: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    monthly_parts, daily_parts = [], []
    for chunk in pd.read_csv(input_path, usecols=list(COLUMN_NAMES), chunksize=CHUNK_ROWS):
        grid = rename_grid(chunk)
        check_fusion_index(grid)
        monthly_parts.append(aggregate_cell_month(grid))
        daily_parts.append(aggregate_daily(grid))

    monthly = pd.concat(monthly_parts).groupby(CELL_MONTH_KEYS, as_index=False).sum()
    daily = pd.concat(daily_parts).groupby("date", as_index=False).sum()
    daily["date"] = pd.to_datetime(daily["date"], format="%Y-%m-%d").dt.date
    return monthly.sort_values(CELL_MONTH_KEYS, ignore_index=True), daily.sort_values("date", ignore_index=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the API files from the IGNIS daily 0.25° grid.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--monthly-output", type=Path, default=DEFAULT_MONTHLY_OUTPUT)
    parser.add_argument("--daily-output", type=Path, default=DEFAULT_DAILY_OUTPUT)
    args = parser.parse_args()

    monthly, daily = build(args.input)
    for output, df in ((args.monthly_output, monthly), (args.daily_output, daily)):
        output.parent.mkdir(parents=True, exist_ok=True)
        df.to_parquet(output, index=False)
        print(f"Saved {len(df):,} rows to {output} ({output.stat().st_size / 1_000_000:.1f} MB)")


if __name__ == "__main__":
    main()
