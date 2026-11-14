import type { TColorName } from '@shared/theme';
import { formatDateTimeIn } from './formatDateTimeIn';

interface IClockStatusParams {
  now: Date | null;
  timeZone: string | null;
  isLoading: boolean;
  hasError: boolean;
}

interface IClockStatus {
  text: string;
  dotColor: TColorName;
  isDotBlinking: boolean;
}

export const getClockStatus = ({ now, timeZone, isLoading, hasError }: IClockStatusParams): IClockStatus => {
  if (isLoading) return { text: 'Contacting ground control…', dotColor: 'warning', isDotBlinking: true };
  if (hasError || !now || !timeZone) return { text: 'API offline', dotColor: 'error', isDotBlinking: false };
  return {
    text: `API online · Cuiabá: ${formatDateTimeIn(now, timeZone)}`,
    dotColor: 'success',
    isDotBlinking: true,
  };
};
