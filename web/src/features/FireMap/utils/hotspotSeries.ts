import type { IHotspotFilters } from '@shared/types';
import { getClassBreaks } from '@shared/utils';
import type { FeatureCollection, Point } from 'geojson';
import type { IHotspotProperties, THotspotSeries, TMapColorMode } from '../types/IHotspotProperties';

export type THotspotCollection = FeatureCollection<Point, IHotspotProperties>;

export const ALL_SERIES: THotspotSeries[] = ['harmonized', 'modis', 'viirs'];

export const SERIES_LABELS: Record<THotspotSeries, string> = {
  modis: 'MODIS hotspots',
  viirs: 'VIIRS hotspots',
  harmonized: 'Harmonized hotspots (MODIS-equivalent)',
};

export const MAP_COLOR_MODE_OPTIONS: { value: TMapColorMode; label: string }[] = [
  { value: 'harmonized', label: 'Harmonized' },
  { value: 'compare', label: 'MODIS vs VIIRS' },
];

export const getVisibleSeries = (filters: IHotspotFilters, mode: TMapColorMode): THotspotSeries[] => {
  if (filters.isModisSelected && !filters.isViirsSelected) return ['modis'];
  if (filters.isViirsSelected && !filters.isModisSelected) return ['viirs'];
  return mode === 'compare' ? ['modis', 'viirs'] : ['harmonized'];
};

export const canCompareSensors = (filters: IHotspotFilters) => filters.isModisSelected && filters.isViirsSelected;

export const getSeriesBreaks = (collection: THotspotCollection | null, series: THotspotSeries) =>
  getClassBreaks(collection?.features.map((feature) => feature.properties[series]) ?? []);
