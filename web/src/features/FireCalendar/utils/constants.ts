import type { TColorName } from '@shared/theme';

export const CALENDAR_TITLE = 'Harmonized Fire Activity Calendar';

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FIRST_YEAR = 2012;
const LAST_YEAR = 2025;

export const CALENDAR_YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, index) => LAST_YEAR - index);

export const HEAT_COLORS: TColorName[] = ['heat1', 'heat2', 'heat3', 'heat4', 'heat5'];

export const CHIP_HEIGHT_PX = 14;
