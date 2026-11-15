import type { THotspotMetric } from '@shared/types';

export interface IPeakMonth {
  year: number;
  month: number;
  hotspots: number;
}

export interface IAreaTotals {
  modis: number;
  viirs: number;
  harmonized: number;
  peak: IPeakMonth | null;
}

export interface IStateSummary extends IAreaTotals {
  code: string;
  abbreviation: string;
  name: string;
  region: string;
}

export interface IRegionSummaryResponse {
  metric: THotspotMetric;
  brazil: IAreaTotals;
  states: IStateSummary[];
}

export interface IRegionSummaryData {
  brazil: IAreaTotals;
  states: Map<string, IStateSummary>;
}
