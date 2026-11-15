import type { IExportMonth } from '@features/Export';
import { getMetricValue } from '@features/Export';
import type { ICalendarSelection, THotspotMetric } from '@shared/types';
import { formatHotspots, getMonthLabel } from '@shared/utils';
import type { ITrendPoint, ITrendTick } from '../types/ITrend';

const MONTHS_PER_YEAR = 12;
const MAX_X_TICKS = 5;
const Y_TICK_COUNT = 3;
const NICE_STEPS = [1, 2, 2.5, 5, 10];

export const toTrendPoints = (months: IExportMonth[], metric: THotspotMetric): ITrendPoint[] =>
  months.map((month) => ({
    year: month.year,
    month: month.month,
    time: month.year * MONTHS_PER_YEAR + month.month - 1,
    value: getMetricValue(month, metric),
  }));

/** Splits a series where months are missing (e.g. a months filter), so the line never bridges a gap. */
export const splitAtGaps = (points: ITrendPoint[]) =>
  points.reduce<ITrendPoint[][]>((segments, point, index) => {
    const previous = points[index - 1];
    if (!previous || point.time - previous.time > 1) segments.push([point]);
    else segments[segments.length - 1].push(point);
    return segments;
  }, []);

const niceStep = (rawStep: number) => {
  if (rawStep <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = NICE_STEPS.find((candidate) => candidate * magnitude >= rawStep) ?? 10;
  return step * magnitude;
};

export const buildYTicks = (maxValue: number): ITrendTick[] => {
  const step = niceStep(maxValue / Y_TICK_COUNT);
  const count = Math.max(1, Math.ceil(maxValue / step));
  return Array.from({ length: count + 1 }, (_, index) => ({
    value: index * step,
    label: formatHotspots(index * step),
  }));
};

export const buildXTicks = (points: ITrendPoint[]): ITrendTick[] => {
  if (points.length === 0) return [];
  const years = [...new Set(points.map((point) => point.year))];

  if (years.length === 1) {
    const every = Math.ceil(points.length / MAX_X_TICKS);
    return points
      .filter((_, index) => index % every === 0)
      .map((point) => ({ value: point.time, label: getMonthLabel(point.month) }));
  }

  const every = Math.ceil(years.length / MAX_X_TICKS);
  return years
    .filter((_, index) => index % every === 0)
    .map((year) => {
      const first = points.find((point) => point.year === year);
      return { value: first?.time ?? year * MONTHS_PER_YEAR, label: String(year) };
    });
};

export const findNearestPoint = (points: ITrendPoint[], time: number) =>
  points.reduce<ITrendPoint | null>(
    (nearest, point) => (!nearest || Math.abs(point.time - time) < Math.abs(nearest.time - time) ? point : nearest),
    null,
  );

/** Time span (first and last month on the chart) covered by the calendar selection, or null. */
export const getSelectionTimeRange = (selection: ICalendarSelection | null, points: ITrendPoint[]) => {
  if (!selection) return null;
  const selected = points.filter(
    (point) => point.year === selection.year && (selection.month === null || point.month === selection.month),
  );
  if (selected.length === 0) return null;
  return { start: selected[0].time, end: selected[selected.length - 1].time };
};

export const formatPointDate = ({ year, month }: ITrendPoint) => `${getMonthLabel(month)} ${year}`;
