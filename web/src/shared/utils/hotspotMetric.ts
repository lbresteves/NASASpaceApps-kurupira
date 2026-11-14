import type { IHotspotFilters, THotspotMetric } from '@shared/types';

const METRIC_UNITS: Record<THotspotMetric, string> = {
  modis: 'MODIS hotspots',
  viirs: 'VIIRS hotspots',
  harmonized: 'harmonized hotspots (MODIS-equivalent)',
};

export const getHotspotMetric = ({ isModisSelected, isViirsSelected }: IHotspotFilters): THotspotMetric => {
  if (isModisSelected && !isViirsSelected) return 'modis';
  if (isViirsSelected && !isModisSelected) return 'viirs';
  return 'harmonized';
};

export const getMetricUnit = (metric: THotspotMetric) => METRIC_UNITS[metric];
