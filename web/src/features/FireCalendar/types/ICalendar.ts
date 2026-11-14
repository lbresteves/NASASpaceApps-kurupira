import type { THotspotMetric } from '@shared/types';

export interface ICalendarMonth {
  year: number;
  month: number;
  hotspots: number;
}

export interface ICalendarResponse {
  metric: THotspotMetric;
  months: ICalendarMonth[];
}
