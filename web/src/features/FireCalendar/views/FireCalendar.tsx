import { Chip, Typography } from '@shared/components';
import type { IYearMonth } from '@shared/types';
import { Fragment } from 'react';
import { CALENDAR_TITLE, CALENDAR_YEARS, CHIP_HEIGHT_PX, HEAT_COLORS, MONTH_LABELS } from '../utils/constants';
import { getSampleLevel } from '../utils/getSampleLevel';
import { isSameMonth } from '../utils/isSameMonth';
import { CalendarContainer, CalendarGrid, CalendarScroll, HeaderCell, YearCell } from './styles/FireCalendar.styled';

export interface IFireCalendarProps {
  selectedMonth: IYearMonth | null;
  onMonthClick: (month: IYearMonth) => void;
}

export const FireCalendar = ({ selectedMonth, onMonthClick }: IFireCalendarProps) => {
  return (
    <CalendarContainer aria-label={CALENDAR_TITLE}>
      <Typography variant="subtitle">{CALENDAR_TITLE}</Typography>
      <Typography variant="caption" color="textSecondary">
        Chip colors are a sample for now. Click a month to see its hotspots on the map.
      </Typography>
      <CalendarScroll>
        <CalendarGrid>
          <HeaderCell>
            <Typography variant="caption" color="textSecondary">
              Year
            </Typography>
          </HeaderCell>
          {MONTH_LABELS.map((label) => (
            <HeaderCell key={label}>
              <Typography variant="caption" color="textSecondary">
                {label}
              </Typography>
            </HeaderCell>
          ))}
          {CALENDAR_YEARS.map((year) => (
            <Fragment key={year}>
              <YearCell>
                <Typography variant="caption">{year}</Typography>
              </YearCell>
              {MONTH_LABELS.map((label, monthIndex) => {
                const month = { year, month: monthIndex + 1 };
                const level = getSampleLevel(year, monthIndex);
                const text = `${label} ${year}: sample level ${level + 1} of ${HEAT_COLORS.length}`;
                return (
                  <Chip
                    key={label}
                    color={HEAT_COLORS[level]}
                    height={CHIP_HEIGHT_PX}
                    label={text}
                    tooltip={text}
                    isSelected={isSameMonth(selectedMonth, month)}
                    onClick={() => onMonthClick(month)}
                  />
                );
              })}
            </Fragment>
          ))}
        </CalendarGrid>
      </CalendarScroll>
    </CalendarContainer>
  );
};
