import type { IHotspotFilters, THotspotMetric } from '@shared/types';
import { formatHotspots, getHotspotMetric, getMonthLabel } from '@shared/utils';
import type { IAreaTotals, IStateSummary } from '../types/IRegionSummary';
import { BRAZIL_REGION_LABELS, EMPTY_VALUE } from './constants';

export interface ISummaryRow {
  label: string;
  value: string;
}

const METRIC_ROW_LABELS: Record<THotspotMetric, string> = {
  harmonized: 'Harmonized (MODIS-eq.)',
  modis: 'MODIS',
  viirs: 'VIIRS',
};

const getSensorMetrics = ({ isModisSelected, isViirsSelected }: IHotspotFilters): THotspotMetric[] => {
  const metrics: THotspotMetric[] = [];
  if (isModisSelected && isViirsSelected) metrics.push('harmonized');
  if (isModisSelected) metrics.push('modis');
  if (isViirsSelected) metrics.push('viirs');
  return metrics;
};

const formatShare = (value: number, total: number) =>
  total > 0 ? `${((value / total) * 100).toFixed(1)}%` : EMPTY_VALUE;

const formatPeak = (area: IAreaTotals) =>
  area.peak ? `${getMonthLabel(area.peak.month)} ${area.peak.year}` : EMPTY_VALUE;

export const getBrazilRegionLabel = (state: IStateSummary) => BRAZIL_REGION_LABELS[state.region] ?? state.region;

export const buildSummaryRows = (area: IAreaTotals, brazil: IAreaTotals, filters: IHotspotFilters) => {
  const metric = getHotspotMetric(filters);

  const rows: ISummaryRow[] = getSensorMetrics(filters).map((sensor) => ({
    label: METRIC_ROW_LABELS[sensor],
    value: formatHotspots(area[sensor]),
  }));
  if (area !== brazil) rows.push({ label: 'Share of Brazil total', value: formatShare(area[metric], brazil[metric]) });
  rows.push({ label: 'Peak month', value: formatPeak(area) });
  return rows;
};
