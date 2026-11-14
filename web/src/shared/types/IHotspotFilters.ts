export type THotspotMetric = 'modis' | 'viirs' | 'harmonized';

export interface IHotspotFilters {
  years: number[];
  months: number[];
  isModisSelected: boolean;
  isViirsSelected: boolean;
}
