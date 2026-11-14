import argparse
from pathlib import Path

import pandas as pd

PREVIEW_ROWS = 100_000


def read_any(path: Path) -> pd.DataFrame:
    if path.suffix == ".parquet":
        return pd.read_parquet(path)
    return pd.read_csv(path, nrows=PREVIEW_ROWS)


def main() -> None:
    parser = argparse.ArgumentParser(description="Print a quick look at a Parquet or CSV (.csv / .csv.gz) file.")
    parser.add_argument("path", type=Path)
    parser.add_argument("--rows", type=int, default=10, help="how many rows to show")
    args = parser.parse_args()

    pd.set_option("display.width", 250)
    pd.set_option("display.max_columns", 60)

    df = read_any(args.path)
    if args.path.suffix != ".parquet":
        print(f"(CSV preview: only the first {PREVIEW_ROWS:,} rows were read)\n")

    print(f"{len(df):,} rows x {len(df.columns)} columns\n")
    print(df.dtypes.to_string(), "\n")
    print(df.head(args.rows).to_string(), "\n")
    print(df.describe().T.to_string())


if __name__ == "__main__":
    main()
