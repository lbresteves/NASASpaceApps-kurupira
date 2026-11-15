import { MonthCalendar } from '@features/FireCalendar';
import { ColorLegend } from '@shared/components';
import type { IYearMonth } from '@shared/types';
import { useOutlookMonths } from '../hooks/useOutlookMonths';
import type { TOutlookMode } from '../types/IOutlook';
import { toPeriod } from '../utils/constants';
import {
  buildOutlookChip,
  buildOutlookLegend,
  getCalendarBreaks,
  getCalendarMonths,
  getCalendarYears,
  getOutlookCalendarStatus,
  OUTLOOK_CALENDAR_TITLES,
  toCalendarMonths,
} from '../utils/outlookCalendar';

export interface IOutlookCalendarProps {
  mode: TOutlookMode;
  period: string | null;
  onPeriodChange: (period: string) => void;
}

export const OutlookCalendar = ({ mode, period, onPeriodChange }: IOutlookCalendarProps) => {
  const { months, hasError } = useOutlookMonths();
  const calendarMonths = months ? toCalendarMonths(mode, months) : [];
  const breaks = getCalendarBreaks(mode, calendarMonths);
  const legend = buildOutlookLegend(mode, breaks);

  return (
    <MonthCalendar
      title={OUTLOOK_CALENDAR_TITLES[mode]}
      status={getOutlookCalendarStatus(mode, months !== null, hasError)}
      years={getCalendarYears(calendarMonths)}
      months={getCalendarMonths()}
      getChip={(yearMonth) => buildOutlookChip(mode, calendarMonths, breaks, period, yearMonth)}
      onMonthClick={({ year, month }: IYearMonth) => onPeriodChange(toPeriod(year, month))}
      legend={<ColorLegend title={legend.title} items={legend.items} />}
    />
  );
};
