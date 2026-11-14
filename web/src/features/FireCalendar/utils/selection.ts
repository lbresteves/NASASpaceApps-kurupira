import type { ICalendarSelection, IYearMonth } from '@shared/types';

export const isMonthSelected = (selection: ICalendarSelection | null, { year, month }: IYearMonth) =>
  selection?.year === year && selection.month === month;

export const isYearSelected = (selection: ICalendarSelection | null, year: number) =>
  selection?.year === year && selection.month === null;

export const isChipMuted = (selection: ICalendarSelection | null, chip: IYearMonth) => {
  if (!selection) return false;
  if (selection.month === null) return selection.year !== chip.year;
  return !isMonthSelected(selection, chip);
};

export const isSameSelection = (a: ICalendarSelection | null, b: ICalendarSelection) =>
  a?.year === b.year && a.month === b.month;
