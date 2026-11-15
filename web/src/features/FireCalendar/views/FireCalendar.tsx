import { Button, ColorLegend } from '@shared/components';
import type { ICalendarSelection, IHotspotFilters, IYearMonth } from '@shared/types';
import type { ReactNode } from 'react';
import { useCalendarData } from '../hooks/useCalendarData';
import { getCalendarStatus, getChipColor, getChipText } from '../utils/calendarCells';
import { CALENDAR_TITLE } from '../utils/constants';
import { isChipMuted, isMonthSelected, isYearSelected } from '../utils/selection';
import { MonthCalendar } from './MonthCalendar';

export interface IFireCalendarProps {
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
  onMonthClick: (month: IYearMonth) => void;
  onYearClick: (year: number) => void;
  onOpenFilters: () => void;
  headerActions?: ReactNode;
}

export const FireCalendar = ({
  filters,
  selection,
  onMonthClick,
  onYearClick,
  onOpenFilters,
  headerActions,
}: IFireCalendarProps) => {
  const { years, months, unit, areaName, getTotal, breaks, legendItems, isLoading, hasError } =
    useCalendarData(filters);

  const getChip = (yearMonth: IYearMonth) => {
    const total = getTotal(yearMonth.year, yearMonth.month);
    return {
      color: getChipColor(total, breaks, isChipMuted(selection, yearMonth)),
      text: getChipText(yearMonth, total, unit),
      isSelected: isMonthSelected(selection, yearMonth),
    };
  };

  return (
    <MonthCalendar
      title={CALENDAR_TITLE}
      status={getCalendarStatus(isLoading, hasError, selection)}
      years={years}
      months={months}
      getChip={getChip}
      onMonthClick={onMonthClick}
      onYearClick={onYearClick}
      isYearSelected={(year) => isYearSelected(selection, year)}
      headerActions={
        <>
          {headerActions}
          <Button color="secondary" onClick={onOpenFilters}>
            Filters
          </Button>
        </>
      }
      legend={<ColorLegend title={`Monthly ${unit} in ${areaName}`} items={legendItems} />}
    />
  );
};
