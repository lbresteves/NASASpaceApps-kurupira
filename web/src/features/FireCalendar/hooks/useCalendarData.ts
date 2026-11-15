import type { IHotspotFilters } from '@shared/types';
import {
  buildLegendItems,
  DATA_YEARS,
  getClassBreaks,
  getFilterAreaName,
  getHotspotMetric,
  getMetricUnit,
  MONTH_NUMBERS,
} from '@shared/utils';
import { useCallback, useMemo } from 'react';
import { getMonthKey } from '../utils/calendarCells';
import { useCalendarTotals } from './useCalendarTotals';

export const useCalendarData = (filters: IHotspotFilters) => {
  const metric = getHotspotMetric(filters);
  const { totals, isLoading, hasError } = useCalendarTotals(metric, filters.stateCode);

  const years = useMemo(() => DATA_YEARS.filter((year) => filters.years.includes(year)), [filters.years]);
  const months = useMemo(() => MONTH_NUMBERS.filter((month) => filters.months.includes(month)), [filters.months]);

  const getTotal = useCallback((year: number, month: number) => totals?.get(getMonthKey({ year, month })), [totals]);

  const breaks = useMemo(
    () => getClassBreaks(years.flatMap((year) => months.map((month) => getTotal(year, month) ?? 0))),
    [years, months, getTotal],
  );

  return {
    years,
    months,
    unit: getMetricUnit(metric),
    areaName: getFilterAreaName(filters),
    getTotal,
    breaks,
    legendItems: buildLegendItems(breaks),
    isLoading,
    hasError,
  };
};
