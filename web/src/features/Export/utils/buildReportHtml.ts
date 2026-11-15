import type { Theme } from '@emotion/react';
import type { THotspotMetric } from '@shared/types';
import { formatHotspots, getMetricUnit, getMonthLabel } from '@shared/utils';
import type { IExportMonth, IReportTotals } from '../types/IExport';
import { REPORT_TITLE } from './constants';

export interface IReportContent {
  area: string;
  period: string;
  sensors: string;
  metric: THotspotMetric;
  generatedAt: Date;
  mapImage: string | null;
  totals: IReportTotals;
  months: IExportMonth[];
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const row = (cells: string[], tag: 'td' | 'th' = 'td') =>
  `<tr>${cells.map((cell) => `<${tag}>${escapeHtml(cell)}</${tag}>`).join('')}</tr>`;

const formatMonth = (month: IExportMonth) => `${getMonthLabel(month.month)} ${month.year}`;

const buildStyles = ({ colors, fontFamily, spacing }: Theme) => `
  @page { margin: 16mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: ${fontFamily}; color: ${colors.printText}; background: ${colors.printBackground}; }
  h1 { font-size: 20px; margin: 0 0 ${spacing.xs}px; }
  h2 { font-size: 14px; margin: ${spacing.lg}px 0 ${spacing.sm}px; }
  p, dd, dt, td, th { font-size: 11px; }
  .muted { color: ${colors.printMuted}; }
  dl { display: grid; grid-template-columns: max-content 1fr; gap: ${spacing.xs}px ${spacing.md}px; margin: ${spacing.md}px 0; }
  dt { color: ${colors.printMuted}; }
  dd { margin: 0; }
  img { width: 100%; max-height: 90mm; object-fit: cover; border: 1px solid ${colors.printBorder}; }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { padding: ${spacing.xs}px ${spacing.sm}px; border-bottom: 1px solid ${colors.printBorder}; text-align: right; }
  th:first-of-type, td:first-of-type { text-align: left; }
  thead th { color: ${colors.printMuted}; font-weight: 600; }
  tr { break-inside: avoid; }
`;

export const buildReportHtml = (theme: Theme, content: IReportContent) => {
  const { area, period, sensors, metric, generatedAt, mapImage, totals, months } = content;
  const peak = totals.peak ? `${formatMonth(totals.peak)}` : '—';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(`${REPORT_TITLE} · ${area}`)}</title>
<style>${buildStyles(theme)}</style>
</head>
<body onload="window.print()">
<h1>${escapeHtml(REPORT_TITLE)}</h1>
<p class="muted">Kurupira · NASA Space Apps Challenge 2026</p>
<dl>
  <dt>Area</dt><dd>${escapeHtml(area)}</dd>
  <dt>Period</dt><dd>${escapeHtml(period)}</dd>
  <dt>Sensors</dt><dd>${escapeHtml(sensors)}</dd>
  <dt>Generated</dt><dd>${escapeHtml(generatedAt.toLocaleString('en-US'))}</dd>
</dl>
${mapImage ? `<img src="${mapImage}" alt="Map of hotspots for the selected period" />` : ''}
<h2>Totals</h2>
<table>
  <tbody>
    ${row(['MODIS hotspots', formatHotspots(totals.modis)])}
    ${row(['VIIRS (S-NPP) hotspots', formatHotspots(totals.viirs)])}
    ${row(['VIIRS converted to the MODIS scale', formatHotspots(totals.viirsModisEquivalent)])}
    ${row(['Harmonized hotspots (MODIS-equivalent)', formatHotspots(totals.harmonized)])}
    ${row([`Peak month (${getMetricUnit(metric)})`, peak])}
  </tbody>
</table>
<h2>Monthly hotspots</h2>
<table>
  <thead>${row(['Month', 'MODIS', 'VIIRS (S-NPP)', 'Harmonized (MODIS-eq.)'], 'th')}</thead>
  <tbody>
    ${months
      .map((month) =>
        row([
          formatMonth(month),
          formatHotspots(month.modis_hotspots),
          formatHotspots(month.viirs_snpp_hotspots),
          formatHotspots(month.harmonized_hotspots_modis_equivalent),
        ]),
      )
      .join('\n    ')}
  </tbody>
</table>
<p class="muted">Hotspots are satellite detections, not individual fires. MODIS and VIIRS counts are never summed:
the harmonized count is the mean of MODIS and VIIRS converted to the MODIS scale. Source: NASA FIRMS, harmonized by the
Kurupira team.</p>
</body>
</html>`;
};
