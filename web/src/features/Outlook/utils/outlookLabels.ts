import { formatHotspots, getPeriodLabel } from '@shared/utils';
import type { IComparisonCellProperties, IForecastCellProperties, TOutlookData } from '../types/IOutlook';
import { BASELINE_LABEL, CELL_SIZE_LABEL } from './constants';

const numberFormat = new Intl.NumberFormat('en-US');
const percentFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

const getSign = (value: number) => (value > 0 ? '+' : value < 0 ? '−' : '±');

export const formatSigned = (value: number) => `${getSign(value)}${formatHotspots(Math.abs(value))}`;

const formatDay = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const describeForecastCell = ({ expected, detection_pct, critical_days }: IForecastCellProperties) =>
  [
    `~${formatHotspots(expected)} expected hotspots`,
    `detected on ${percentFormat.format(detection_pct)}% of these days in ${BASELINE_LABEL}`,
    critical_days > 0 ? `top 10% cell on ${critical_days} days` : null,
  ]
    .filter(Boolean)
    .join(' · ');

export const describeComparisonCell = ({ observed, average, anomaly }: IComparisonCellProperties) =>
  `${formatHotspots(observed)} hotspots vs ${formatHotspots(average)} average (${formatSigned(anomaly)})`;

export const getLegendTitle = (data: TOutlookData) =>
  data.mode === 'forecast'
    ? `Expected hotspots per ${CELL_SIZE_LABEL}, ${getPeriodLabel(data.period)}`
    : `${getPeriodLabel(data.period)} vs its ${BASELINE_LABEL} average, hotspots per ${CELL_SIZE_LABEL}`;

export const getLegendNotes = (data: TOutlookData): string[] => {
  if (data.mode === 'forecast') {
    const summary = data.collection.summary;
    return [
      `Local values: ${BASELINE_LABEL} average for the same calendar days (historical analog), not a fire probability.`,
      `National model: ~${numberFormat.format(summary.expected_total)} hotspots this month (${numberFormat.format(summary.daily_min)}–${numberFormat.format(summary.daily_max)} per day). Chance of a high-activity day (≥ ${numberFormat.format(summary.high_activity_threshold)}) peaks at ${percentFormat.format(summary.high_activity_probability_max_pct)}% on ${formatDay(summary.high_activity_peak_date)}.`,
    ];
  }
  const { observed_total, average_total, anomaly_pct } = data.collection.summary;
  const change = anomaly_pct === null ? '' : ` (${anomaly_pct > 0 ? '+' : ''}${percentFormat.format(anomaly_pct)}%)`;
  return [
    `Brazil: ${numberFormat.format(observed_total)} hotspots vs ${numberFormat.format(average_total)} on average${change}.`,
    'Blue: fewer than the cell’s average for this month. Gray: close to it. Orange: more.',
  ];
};

export const getLegendDescription = (breaks: number[], isAnomaly: boolean) => {
  if (breaks.length === 0) return '';
  if (!isAnomaly)
    return `from below ${formatHotspots(breaks[0])} to ${formatHotspots(breaks[breaks.length - 1])} or more`;
  const strong = breaks[breaks.length - 1];
  return `${formatSigned(-strong)} or fewer is much below average, near zero is close to average, ${formatSigned(strong)} or more is much above`;
};

export const DATA_LIMITS_NOTE =
  'Hotspots are satellite detections, not confirmed fires. Fusion index (MODIS-equivalent) is experimental; no weather data.';
