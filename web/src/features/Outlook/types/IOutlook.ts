import type { FeatureCollection, Point } from 'geojson';

export type TMapDataMode = 'observed' | 'forecast' | 'comparison';

export type TOutlookMode = Exclude<TMapDataMode, 'observed'>;

export interface IForecastCellProperties {
  expected: number;
  detection_pct: number;
  critical_days: number;
}

export interface IForecastSummary {
  days: number;
  expected_total: number;
  daily_min: number;
  daily_max: number;
  high_activity_threshold: number;
  high_activity_probability_max_pct: number;
  high_activity_peak_date: string;
}

export interface IComparisonCellProperties {
  observed: number;
  average: number;
  anomaly: number;
}

export interface IComparisonSummary {
  observed_total: number;
  average_total: number;
  anomaly_pct: number | null;
}

export type TForecastCollection = FeatureCollection<Point, IForecastCellProperties> & { summary: IForecastSummary };

export type TComparisonCollection = FeatureCollection<Point, IComparisonCellProperties> & {
  summary: IComparisonSummary;
};

export type TOutlookData =
  | { mode: 'forecast'; period: string; collection: TForecastCollection }
  | { mode: 'comparison'; period: string; collection: TComparisonCollection };
