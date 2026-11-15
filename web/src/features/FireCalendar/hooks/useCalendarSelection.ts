import type { ICalendarSelection, IHotspotFilters, IYearMonth } from '@shared/types';
import { useCallback, useState } from 'react';
import { isSameSelection } from '../utils/selection';

export const useCalendarSelection = (filters: IHotspotFilters) => {
  const [selection, setSelection] = useState<ICalendarSelection | null>(null);

  const toggle = useCallback((next: ICalendarSelection) => {
    setSelection((current) => (isSameSelection(current, next) ? null : next));
  }, []);

  const toggleMonth = useCallback(({ year, month }: IYearMonth) => toggle({ year, month }), [toggle]);
  const selectMonth = useCallback(({ year, month }: IYearMonth) => setSelection({ year, month }), []);
  const toggleYear = useCallback((year: number) => toggle({ year, month: null }), [toggle]);

  const isVisible =
    selection !== null &&
    filters.years.includes(selection.year) &&
    (selection.month === null || filters.months.includes(selection.month));

  return { selection: isVisible ? selection : null, selectMonth, toggleMonth, toggleYear };
};
