import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { getMonthLabel, MONTH_NUMBERS } from './hotspotPeriod';

const MAX_LISTED_MONTHS = 3;

const describeYears = (years: number[]) => {
  const sorted = [...years].sort((a, b) => a - b);
  if (sorted.length === 1) return String(sorted[0]);
  const isContiguous = sorted.every((year, index) => index === 0 || year === sorted[index - 1] + 1);
  return isContiguous ? `${sorted[0]}–${sorted[sorted.length - 1]}` : `${sorted.length} years`;
};

const describeMonths = (months: number[]) => {
  if (months.length === MONTH_NUMBERS.length) return null;
  if (months.length > MAX_LISTED_MONTHS) return `${months.length} months`;
  return [...months]
    .sort((a, b) => a - b)
    .map(getMonthLabel)
    .join(', ');
};

export const describePeriod = (filters: IHotspotFilters, selection: ICalendarSelection | null) => {
  if (selection?.month) return `${getMonthLabel(selection.month)} ${selection.year}`;

  const years = selection ? [selection.year] : filters.years;
  return [describeYears(years), describeMonths(filters.months)].filter(Boolean).join(' · ');
};
