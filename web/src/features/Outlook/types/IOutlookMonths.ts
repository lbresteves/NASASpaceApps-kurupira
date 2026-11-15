export interface IForecastMonth {
  period: string;
  expected_total: number;
}

export interface IComparisonMonth {
  period: string;
  observed_total: number;
  average_total: number;
  anomaly_pct: number | null;
}

export interface IOutlookMonths {
  forecast: IForecastMonth[];
  comparison: IComparisonMonth[];
}
