import { DATA_YEARS, MONTH_LABELS, MONTH_NUMBERS } from '@shared/utils';
import type { IFilterOption } from '../views/FilterCheckboxGroup';

export const YEAR_OPTIONS: IFilterOption[] = DATA_YEARS.map((year) => ({ value: year, label: String(year) }));

export const MONTH_OPTIONS: IFilterOption[] = MONTH_NUMBERS.map((month) => ({
  value: month,
  label: MONTH_LABELS[month - 1],
}));
