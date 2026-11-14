import { Button, Chip, ColorLegend, Typography } from '@shared/components';
import type { ICalendarSelection, IHotspotFilters, IYearMonth } from '@shared/types';
import { getMonthLabel } from '@shared/utils';
import { Fragment } from 'react';
import { useCalendarData } from '../hooks/useCalendarData';
import { getCalendarStatus, getChipColor, getChipText } from '../utils/calendarCells';
import { CALENDAR_TITLE, CHIP_HEIGHT_PX } from '../utils/constants';
import { isChipMuted, isMonthSelected, isYearSelected } from '../utils/selection';
import {
  CalendarContainer,
  CalendarGrid,
  CalendarHeader,
  CalendarScroll,
  HeaderCell,
  YearButton,
} from './styles/FireCalendar.styled';

export interface IFireCalendarProps {
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
  onMonthClick: (month: IYearMonth) => void;
  onYearClick: (year: number) => void;
  onOpenFilters: () => void;
}

export const FireCalendar = ({ filters, selection, onMonthClick, onYearClick, onOpenFilters }: IFireCalendarProps) => {
  const { years, months, unit, getTotal, breaks, legendItems, isLoading, hasError } = useCalendarData(filters);

  return (
    <CalendarContainer aria-label={CALENDAR_TITLE}>
      <CalendarHeader>
        <Typography variant="subtitle">{CALENDAR_TITLE}</Typography>
        <Button color="surface" onClick={onOpenFilters}>
          Filters
        </Button>
      </CalendarHeader>
      <Typography variant="caption" color="textSecondary">
        {getCalendarStatus(isLoading, hasError, selection)}
      </Typography>
      <CalendarScroll>
        <CalendarGrid monthCount={months.length}>
          <HeaderCell>
            <Typography variant="caption" color="textSecondary">
              Year
            </Typography>
          </HeaderCell>
          {months.map((month) => (
            <HeaderCell key={month}>
              <Typography variant="caption" color="textSecondary">
                {getMonthLabel(month)}
              </Typography>
            </HeaderCell>
          ))}
          {years.map((year) => (
            <Fragment key={year}>
              <YearButton
                type="button"
                isSelected={isYearSelected(selection, year)}
                aria-pressed={isYearSelected(selection, year)}
                aria-label={`Show only ${year} on the map`}
                onClick={() => onYearClick(year)}>
                {year}
              </YearButton>
              {months.map((month) => {
                const yearMonth = { year, month };
                const total = getTotal(year, month);
                const text = getChipText(yearMonth, total, unit);
                return (
                  <Chip
                    key={month}
                    color={getChipColor(total, breaks, isChipMuted(selection, yearMonth))}
                    height={CHIP_HEIGHT_PX}
                    label={text}
                    tooltip={text}
                    isSelected={isMonthSelected(selection, yearMonth)}
                    onClick={() => onMonthClick(yearMonth)}
                  />
                );
              })}
            </Fragment>
          ))}
        </CalendarGrid>
      </CalendarScroll>
      <ColorLegend title={`Monthly ${unit} in Brazil`} items={legendItems} />
    </CalendarContainer>
  );
};
