import type { ICalendarSelection, IHotspotFilters } from '@shared/types';

export const buildHotspotSearch = (filters: IHotspotFilters, selection: ICalendarSelection | null = null) => {
  const years = selection ? [selection.year] : filters.years;
  const months = selection?.month ? [selection.month] : filters.months;
  if (years.length === 0 || months.length === 0) return null;

  const params = new URLSearchParams();
  [...years].sort().forEach((year) => params.append('years', String(year)));
  [...months].sort((a, b) => a - b).forEach((month) => params.append('months', String(month)));
  if (filters.stateCode) params.set('state', filters.stateCode);
  return params.toString();
};
