export type THotspotMetric = 'modis' | 'viirs' | 'harmonized';

export interface IHotspotFilters {
  countryIso: string;
  stateCode: string | null;
  years: number[];
  months: number[];
  isModisSelected: boolean;
  isViirsSelected: boolean;
}
