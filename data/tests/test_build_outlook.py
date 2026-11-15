import pandas as pd
import pytest

from pipeline.build_outlook import aggregate_comparison_cells, aggregate_forecast_cells, aggregate_forecast_daily


def make_forecast(rows):
    base = {
        "date": "2026-12-01",
        "latitude": -14.875,
        "longitude": -55.875,
        "detection_frequency_pct": 31.0,
        "expected_hotspots": 1.0,
        "is_critical": 0,
        "national_estimate": 900.0,
        "national_lower_80": 600.0,
        "national_upper_80": 1200.0,
        "high_activity_probability_pct": 7.5,
        "high_activity_threshold": 1507.2,
    }
    return pd.DataFrame([{**base, **row} for row in rows])


def test_forecast_cells_sum_expected_hotspots_over_the_month():
    forecast = make_forecast([{"date": "2026-12-01"}, {"date": "2026-12-02", "expected_hotspots": 2.0}])

    cells = aggregate_forecast_cells(forecast)

    assert len(cells) == 1
    assert cells.loc[0, "expected_hotspots"] == 3.0


def test_forecast_days_without_a_row_count_as_zero_detection_frequency():
    forecast = make_forecast([{"date": "2026-12-01", "detection_frequency_pct": 31.0}])

    cells = aggregate_forecast_cells(forecast)

    assert cells.loc[0, "mean_detection_frequency_pct"] == pytest.approx(1.0)


def test_forecast_cells_count_critical_days_per_month():
    forecast = make_forecast([{"is_critical": 1}, {"date": "2026-12-02", "is_critical": 1}, {"date": "2027-01-01"}])

    cells = aggregate_forecast_cells(forecast)

    assert cells.set_index("month").loc[12, "critical_days"] == 2
    assert cells.set_index("month").loc[1, "critical_days"] == 0


def test_forecast_daily_keeps_one_national_row_per_date():
    forecast = make_forecast([{}, {"latitude": -10.125}, {"date": "2026-12-02", "national_estimate": 950.0}])

    daily = aggregate_forecast_daily(forecast)

    assert len(daily) == 2
    assert list(daily["national_estimate"]) == [900.0, 950.0]


def test_forecast_daily_fails_when_cells_of_a_date_disagree():
    forecast = make_forecast([{}, {"latitude": -10.125, "national_estimate": 1.0}])

    with pytest.raises(ValueError, match="National forecast"):
        aggregate_forecast_daily(forecast)


def make_comparison(rows):
    base = {"year": 2024, "month": 12, "latitude": -14.875, "longitude": -55.875, "observed": 1.0}
    return pd.DataFrame([{**base, **row} for row in rows])


def test_comparison_fills_years_without_detection_with_zero_before_averaging():
    comparison = make_comparison([{"year": 2024, "observed": 4.0}, {"year": 2025, "latitude": -10.125}])

    cells = aggregate_comparison_cells(comparison).set_index(["year", "latitude"])

    assert cells.loc[(2025, -14.875), "observed"] == 0
    assert cells.loc[(2024, -14.875), "average"] == 2.0
    assert cells.loc[(2024, -14.875), "anomaly"] == 2.0
    assert cells.loc[(2025, -14.875), "anomaly"] == -2.0


def test_comparison_sums_the_days_of_a_cell_month():
    comparison = make_comparison([{"observed": 1.5}, {"observed": 2.5}])

    cells = aggregate_comparison_cells(comparison)

    assert cells.loc[0, "observed"] == 4.0


def test_comparison_keeps_months_apart():
    comparison = make_comparison([{"month": 12, "observed": 6.0}, {"month": 1, "observed": 2.0}])

    cells = aggregate_comparison_cells(comparison).set_index("month")

    assert cells.loc[12, "average"] == 6.0
    assert cells.loc[1, "average"] == 2.0
