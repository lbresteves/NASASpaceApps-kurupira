import type { TColorName } from '@shared/theme';
import type { ICalendarSelection, IYearMonth } from '@shared/types';
import { formatHotspots, getClassColor, getMonthLabel } from '@shared/utils';

export const getMonthKey = ({ year, month }: IYearMonth) => `${year}-${month}`;

export const getChipColor = (total: number | undefined, breaks: number[], isMuted: boolean): TColorName =>
  isMuted || total === undefined ? 'dataMuted' : getClassColor(total, breaks);

export const getChipText = ({ year, month }: IYearMonth, total: number | undefined, unit: string) => {
  const period = `${getMonthLabel(month)} ${year}`;
  return total === undefined ? `${period}: no data` : `${period}: ${formatHotspots(total)} ${unit}`;
};

export const getCalendarStatus = (isLoading: boolean, hasError: boolean, selection: ICalendarSelection | null) => {
  if (isLoading) return 'Loading the calendar…';
  if (hasError) return 'Could not load the calendar data. Is the API running?';
  if (selection?.month) {
    return `Showing ${getMonthLabel(selection.month)} ${selection.year} on the map. Click it again to show every filtered month.`;
  }
  if (selection) return `Showing ${selection.year} on the map. Click the year again to show every filtered year.`;
  return 'The map shows every filtered month. Click a month or a year to focus on it.';
};
