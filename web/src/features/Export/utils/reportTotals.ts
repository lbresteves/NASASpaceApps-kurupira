import type { THotspotMetric } from '@shared/types';
import type { IExportMonth, IReportTotals } from '../types/IExport';

const METRIC_FIELDS: Record<THotspotMetric, keyof IExportMonth> = {
  modis: 'modis_hotspots',
  viirs: 'viirs_snpp_hotspots',
  harmonized: 'harmonized_hotspots_modis_equivalent',
};

export const getMetricValue = (month: IExportMonth, metric: THotspotMetric) => Number(month[METRIC_FIELDS[metric]]);

export const buildReportTotals = (months: IExportMonth[], metric: THotspotMetric): IReportTotals => ({
  modis: months.reduce((total, month) => total + month.modis_hotspots, 0),
  viirs: months.reduce((total, month) => total + month.viirs_snpp_hotspots, 0),
  viirsModisEquivalent: months.reduce((total, month) => total + month.viirs_modis_equivalent_hotspots, 0),
  harmonized: months.reduce((total, month) => total + month.harmonized_hotspots_modis_equivalent, 0),
  peak: months.reduce<IExportMonth | null>(
    (peak, month) => (!peak || getMetricValue(month, metric) > getMetricValue(peak, metric) ? month : peak),
    null,
  ),
});
