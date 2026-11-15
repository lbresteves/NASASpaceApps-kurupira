import type { IMonthChip } from '@features/FireCalendar';
import type { ILegendItem, IYearMonth } from '@shared/types';
import { buildLegendItems, COLOR_RAMPS, getClassBreaks, getClassColor, getClassIndex } from '@shared/utils';
import type { TOutlookMode } from '../types/IOutlook';
import type { IOutlookMonths } from '../types/IOutlookMonths';
import { BASELINE_LABEL, getPeriodLabel, toPeriod } from './constants';
import { getAnomalyBreaks } from './outlookScale';

const numberFormat = new Intl.NumberFormat('en-US');
const percentFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, signDisplay: 'exceptZero' });

const CALENDAR_MONTHS = [1, 12];

export const OUTLOOK_CALENDAR_TITLES: Record<TOutlookMode, string> = {
  forecast: 'Dec–Jan Forecast Calendar',
  comparison: `Dec–Jan vs ${BASELINE_LABEL} Average`,
};

const OUTLOOK_CALENDAR_STATUS: Record<TOutlookMode, string> = {
  forecast: 'National model estimate for each forecast month. Click a month to show it on the map.',
  comparison: `Each December and January in Brazil vs its ${BASELINE_LABEL} average. Click a month to show it on the map.`,
};

export const getOutlookCalendarStatus = (mode: TOutlookMode, isLoaded: boolean, hasError: boolean) => {
  if (hasError) return 'Could not load the forecast months. Is the API running?';
  if (!isLoaded) return 'Loading the calendar…';
  return OUTLOOK_CALENDAR_STATUS[mode];
};

export interface IOutlookCalendarMonth {
  period: string;
  value: number;
  text: string;
}

const formatPercent = (value: number) => `${percentFormat.format(value).replace('-', '−')}%`;

export const toCalendarMonths = (mode: TOutlookMode, months: IOutlookMonths): IOutlookCalendarMonth[] =>
  mode === 'forecast'
    ? months.forecast.map(({ period, expected_total }) => ({
        period,
        value: expected_total,
        text: `${getPeriodLabel(period)}: ~${numberFormat.format(expected_total)} expected hotspots in Brazil`,
      }))
    : months.comparison.map(({ period, observed_total, average_total, anomaly_pct }) => ({
        period,
        value: anomaly_pct ?? 0,
        text: `${getPeriodLabel(period)}: ${numberFormat.format(observed_total)} hotspots vs ${numberFormat.format(average_total)} average${anomaly_pct === null ? '' : ` (${formatPercent(anomaly_pct)})`}`,
      }));

export const getCalendarYears = (months: IOutlookCalendarMonth[]) =>
  [...new Set(months.map(({ period }) => Number(period.slice(0, 4))))].sort((a, b) => b - a);

export const getCalendarMonths = () => CALENDAR_MONTHS;

export const getCalendarBreaks = (mode: TOutlookMode, months: IOutlookCalendarMonth[]) => {
  const values = months.map(({ value }) => value);
  return mode === 'forecast' ? getClassBreaks(values) : getAnomalyBreaks(values);
};

export const buildOutlookChip = (
  mode: TOutlookMode,
  months: IOutlookCalendarMonth[],
  breaks: number[],
  selectedPeriod: string | null,
  { year, month }: IYearMonth,
): IMonthChip | null => {
  const period = toPeriod(year, month);
  const found = months.find((item) => item.period === period);
  if (!found) return null;

  const isSelected = period === selectedPeriod;
  if (selectedPeriod && !isSelected) return { color: 'dataMuted', text: found.text, isSelected };

  const color =
    mode === 'forecast'
      ? getClassColor(found.value, breaks)
      : (COLOR_RAMPS.anomaly[getClassIndex(found.value, breaks)] ?? 'anomalyNeutral');
  return { color, text: found.text, isSelected };
};

const buildAnomalyLegendItems = (breaks: number[]): ILegendItem[] => {
  if (breaks.length !== 4) return [];
  const [strongLow, nearLow, nearHigh, strongHigh] = breaks.map(formatPercent);
  const labels = [
    `below ${strongLow}`,
    `${strongLow} to ${nearLow}`,
    `${nearLow} to ${nearHigh}`,
    `${nearHigh} to ${strongHigh}`,
    `above ${strongHigh}`,
  ];
  return labels.map((label, index) => ({ color: COLOR_RAMPS.anomaly[index], label }));
};

export const buildOutlookLegend = (mode: TOutlookMode, breaks: number[]) =>
  mode === 'forecast'
    ? { title: 'Expected hotspots in Brazil per month', items: buildLegendItems(breaks) }
    : { title: `Hotspots in Brazil vs the ${BASELINE_LABEL} average`, items: buildAnomalyLegendItems(breaks) };
