export interface IExportMonth {
  year: number;
  month: number;
  area: string;
  modis_hotspots: number;
  viirs_snpp_hotspots: number;
  viirs_modis_equivalent_hotspots: number;
  harmonized_hotspots_modis_equivalent: number;
}

export interface IExportResponse {
  area: string;
  months: IExportMonth[];
}

export interface IReportTotals {
  modis: number;
  viirs: number;
  viirsModisEquivalent: number;
  harmonized: number;
  peak: IExportMonth | null;
}
