import { HEAT_COLORS } from './constants';

const PEAK_MONTH_INDEX = 8;

export const getSampleLevel = (year: number, monthIndex: number) => {
  const season = (Math.cos(((monthIndex - PEAK_MONTH_INDEX) / 12) * 2 * Math.PI) + 1) / 2;
  const yearShift = ((year * 7) % 5) / 10 - 0.2;
  const level = Math.round((season + yearShift) * (HEAT_COLORS.length - 1));
  return Math.min(Math.max(level, 0), HEAT_COLORS.length - 1);
};
