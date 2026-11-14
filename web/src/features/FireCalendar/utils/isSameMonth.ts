import type { IYearMonth } from '@shared/types';

export const isSameMonth = (a: IYearMonth | null, b: IYearMonth) => a?.year === b.year && a.month === b.month;
