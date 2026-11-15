from enum import StrEnum
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
DATA_FILE = DATA_DIR / "brazil_cell_monthly_2012_2025.parquet"
STATE_DATA_FILE = DATA_DIR / "brazil_state_monthly_2012_2025.parquet"
CELL_STATES_FILE = DATA_DIR / "brazil_cell_states.parquet"
FIRST_YEAR = 2012
LAST_YEAR = 2025


class Metric(StrEnum):
    modis = "modis"
    viirs = "viirs"
    harmonized = "harmonized"


METRIC_COLUMNS = {
    Metric.modis: "modis_hotspots",
    Metric.viirs: "viirs_snpp_hotspots",
    Metric.harmonized: "fusion_index_modis_equivalent",
}
