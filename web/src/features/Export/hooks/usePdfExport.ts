import { useTheme } from '@emotion/react';
import { useMapSnapshot } from '@features/FireMap';
import type { IHotspotFilters } from '@shared/types';
import { buildHotspotSearch, describePeriod, getFilterAreaName, getHotspotMetric } from '@shared/utils';
import { useState } from 'react';
import { getMonthlyExport } from '../services/exportService';
import { buildReportHtml } from '../utils/buildReportHtml';
import { describeSensors } from '../utils/reportLabels';
import { buildReportTotals } from '../utils/reportTotals';

const PREPARING_HTML =
  '<!doctype html><title>Preparing report…</title><p style="font-family:sans-serif">Preparing report…</p>';

export const usePdfExport = (filters: IHotspotFilters) => {
  const theme = useTheme();
  const captureMap = useMapSnapshot();
  const [isExporting, setIsExporting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const search = buildHotspotSearch(filters);

  const exportPdf = async () => {
    if (!search) return;
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      setHasError(true);
      return;
    }

    reportWindow.document.write(PREPARING_HTML);
    setIsExporting(true);
    setHasError(false);

    try {
      const metric = getHotspotMetric(filters);
      const [{ months }, mapImage] = await Promise.all([getMonthlyExport(search), captureMap()]);
      const html = buildReportHtml(theme, {
        area: getFilterAreaName(filters),
        period: describePeriod(filters, null),
        sensors: describeSensors(filters),
        metric,
        generatedAt: new Date(),
        mapImage,
        totals: buildReportTotals(months, metric),
        months,
      });
      reportWindow.document.open();
      reportWindow.document.write(html);
      reportWindow.document.close();
    } catch (error) {
      console.error('[Export] Could not build the PDF report', error);
      reportWindow.close();
      setHasError(true);
    } finally {
      setIsExporting(false);
    }
  };

  return { exportPdf, isExporting, hasError, canExport: search !== null };
};
