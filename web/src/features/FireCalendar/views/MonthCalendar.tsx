import { Chip, Typography } from '@shared/components';
import type { IYearMonth } from '@shared/types';
import { getMonthLabel } from '@shared/utils';
import { Fragment, type ReactNode } from 'react';
import type { IMonthChip } from '../types/IMonthChip';
import { CHIP_HEIGHT_PX } from '../utils/constants';
import {
  CalendarContainer,
  CalendarGrid,
  CalendarHeader,
  CalendarScroll,
  HeaderActions,
  HeaderCell,
  YearButton,
  YearLabel,
} from './styles/FireCalendar.styled';

export interface IMonthCalendarProps {
  title: string;
  status: string;
  years: number[];
  months: number[];
  getChip: (month: IYearMonth) => IMonthChip | null;
  onMonthClick: (month: IYearMonth) => void;
  onYearClick?: (year: number) => void;
  isYearSelected?: (year: number) => boolean;
  headerActions?: ReactNode;
  legend?: ReactNode;
}

export const MonthCalendar = ({
  title,
  status,
  years,
  months,
  getChip,
  onMonthClick,
  onYearClick,
  isYearSelected = () => false,
  headerActions,
  legend,
}: IMonthCalendarProps) => {
  return (
    <CalendarContainer aria-label={title}>
      <CalendarHeader>
        <Typography variant="subtitle">{title}</Typography>
        {headerActions && <HeaderActions>{headerActions}</HeaderActions>}
      </CalendarHeader>
      <Typography variant="caption" color="textSecondary">
        {status}
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
              {onYearClick ? (
                <YearButton
                  type="button"
                  isSelected={isYearSelected(year)}
                  aria-pressed={isYearSelected(year)}
                  aria-label={`Show only ${year} on the map`}
                  onClick={() => onYearClick(year)}>
                  {year}
                </YearButton>
              ) : (
                <YearLabel>{year}</YearLabel>
              )}
              {months.map((month) => {
                const yearMonth = { year, month };
                const chip = getChip(yearMonth);
                if (!chip) return <span key={month} aria-hidden="true" />;
                return (
                  <Chip
                    key={month}
                    color={chip.color}
                    height={CHIP_HEIGHT_PX}
                    label={chip.text}
                    tooltip={chip.text}
                    isSelected={chip.isSelected}
                    onClick={() => onMonthClick(yearMonth)}
                  />
                );
              })}
            </Fragment>
          ))}
        </CalendarGrid>
      </CalendarScroll>
      {legend}
    </CalendarContainer>
  );
};
