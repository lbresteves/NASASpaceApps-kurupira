const FIRST_DATA_YEAR = 2012;
const LAST_DATA_YEAR = 2025;

export const DATA_YEARS = Array.from(
  { length: LAST_DATA_YEAR - FIRST_DATA_YEAR + 1 },
  (_, index) => LAST_DATA_YEAR - index,
);

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MONTH_NUMBERS = MONTH_LABELS.map((_, index) => index + 1);

export const getMonthLabel = (month: number) => MONTH_LABELS[month - 1];
