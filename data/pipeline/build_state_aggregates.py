import argparse
import json
from pathlib import Path

import pandas as pd
from shapely import STRtree, points
from shapely.geometry import shape

DATA_DIR = Path(__file__).resolve().parent.parent
REPO_DIR = DATA_DIR.parent
DEFAULT_CELLS = REPO_DIR / "api" / "data" / "brazil_cell_monthly_2012_2025.parquet"
DEFAULT_STATES = REPO_DIR / "web" / "public" / "data" / "brazil-states.geojson"
DEFAULT_OUTPUT = REPO_DIR / "api" / "data" / "brazil_state_monthly_2012_2025.parquet"
DEFAULT_CELL_STATES_OUTPUT = REPO_DIR / "api" / "data" / "brazil_cell_states.parquet"
MAX_NEAREST_DEGREES = 0.5

CELL_KEYS = ["cell_lat_id", "cell_lon_id", "latitude", "longitude"]
STATE_KEYS = ["year", "month", "state_code", "state_abbreviation", "state_name", "region"]
SUM_COLUMNS = [
    "modis_hotspots",
    "viirs_snpp_hotspots",
    "viirs_modis_equivalent_hotspots",
    "fusion_index_modis_equivalent",
]


def load_states(path: Path) -> tuple[list, pd.DataFrame]:
    features = json.loads(path.read_text(encoding="utf-8"))["features"]
    geometries = [shape(feature["geometry"]) for feature in features]
    attributes = pd.DataFrame(
        {
            "state_code": [feature["properties"]["code"] for feature in features],
            "state_abbreviation": [feature["properties"]["abbreviation"] for feature in features],
            "state_name": [feature["properties"]["name"] for feature in features],
            "region": [feature["properties"]["region"] for feature in features],
        }
    )
    return geometries, attributes


def assign_cells_to_states(cells: pd.DataFrame, geometries: list) -> pd.Series:
    tree = STRtree(geometries)
    centers = points(cells["longitude"].to_numpy(), cells["latitude"].to_numpy())
    nearest, distances = tree.query_nearest(centers, return_distance=True, all_matches=False)
    if (distances > MAX_NEAREST_DEGREES).any():
        far = int((distances > MAX_NEAREST_DEGREES).sum())
        raise ValueError(f"{far} cells are more than {MAX_NEAREST_DEGREES}° away from any state.")

    state_index = pd.Series(nearest[1], index=nearest[0]).sort_index()
    return pd.Series(state_index.to_numpy(), index=cells.index)


def build_cell_states(cell_monthly: pd.DataFrame, geometries: list, attributes: pd.DataFrame) -> pd.DataFrame:
    cells = cell_monthly[CELL_KEYS].drop_duplicates().reset_index(drop=True)
    cells["state_index"] = assign_cells_to_states(cells, geometries)
    return cells.join(attributes, on="state_index").drop(columns="state_index")


def aggregate_state_month(cell_monthly: pd.DataFrame, cells: pd.DataFrame) -> pd.DataFrame:
    with_states = cell_monthly.merge(cells, on=CELL_KEYS, how="left", validate="many_to_one")
    grouped = with_states.groupby(STATE_KEYS, as_index=False)
    states = grouped[SUM_COLUMNS].sum()
    states["cells_with_hotspots"] = grouped.size()["size"].to_numpy()
    return states.sort_values(["year", "month", "state_code"], ignore_index=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Sum the monthly grid cells by Brazilian state.")
    parser.add_argument("--cells", type=Path, default=DEFAULT_CELLS)
    parser.add_argument("--states", type=Path, default=DEFAULT_STATES)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--cell-states-output", type=Path, default=DEFAULT_CELL_STATES_OUTPUT)
    args = parser.parse_args()

    geometries, attributes = load_states(args.states)
    cell_monthly = pd.read_parquet(args.cells)
    cells = build_cell_states(cell_monthly, geometries, attributes)
    states = aggregate_state_month(cell_monthly, cells)
    cell_states = cells[["cell_lat_id", "cell_lon_id", "state_code"]]

    for output, df in ((args.output, states), (args.cell_states_output, cell_states)):
        output.parent.mkdir(parents=True, exist_ok=True)
        df.to_parquet(output, index=False)
        print(f"Saved {len(df):,} rows to {output} ({output.stat().st_size / 1_000_000:.2f} MB)")


if __name__ == "__main__":
    main()
