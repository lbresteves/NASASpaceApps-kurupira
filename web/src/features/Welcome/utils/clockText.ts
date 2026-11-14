import type { IClock } from '../types/IClock';

interface IClockTextParams {
  clock: IClock | null;
  isLoading: boolean;
  hasError: boolean;
}

export const getClockText = ({ clock, isLoading, hasError }: IClockTextParams) => {
  if (isLoading) return 'Contacting ground control…';
  if (hasError || !clock) return 'API offline ❌';
  return `API online ✅ · Cuiabá: ${clock.date} ${clock.time}`;
};
