import type { ISelectOption, TRange } from '@shared/components';
import { BRAZIL, BRAZIL_STATES, DATA_YEARS, MONTH_LABELS, MONTH_NUMBERS } from '@shared/utils';
import type { IFilterOption } from '../views/FilterCheckboxGroup';

export const ALL_STATES_VALUE = '';

export const FIRST_YEAR = Math.min(...DATA_YEARS);
export const LAST_YEAR = Math.max(...DATA_YEARS);

export const COUNTRY_OPTIONS: ISelectOption[] = [{ value: BRAZIL.iso, label: BRAZIL.name }];

export const STATE_OPTIONS: ISelectOption[] = [
  { value: ALL_STATES_VALUE, label: 'All states' },
  ...BRAZIL_STATES.map((state) => ({ value: state.code, label: `${state.name} (${state.abbreviation})` })),
];

export const MONTH_OPTIONS: IFilterOption[] = MONTH_NUMBERS.map((month) => ({
  value: month,
  label: MONTH_LABELS[month - 1],
}));

export const getYearRange = (years: number[]): TRange =>
  years.length > 0 ? [Math.min(...years), Math.max(...years)] : [FIRST_YEAR, LAST_YEAR];

export const buildYearRange = ([from, to]: TRange) => Array.from({ length: to - from + 1 }, (_, index) => to - index);
