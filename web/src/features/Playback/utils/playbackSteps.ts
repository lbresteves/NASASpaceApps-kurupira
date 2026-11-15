import type { IHotspotFilters, IYearMonth } from '@shared/types';
import { getMonthLabel } from '@shared/utils';

export const PLAYBACK_STEP_MS = 1000;

/** Every filtered month in time order: oldest year first, then month by month. */
export const buildPlaybackSteps = ({ years, months }: Pick<IHotspotFilters, 'years' | 'months'>): IYearMonth[] => {
  const sortedMonths = [...months].sort((a, b) => a - b);
  return [...years].sort((a, b) => a - b).flatMap((year) => sortedMonths.map((month) => ({ year, month })));
};

export const getStepsKey = (steps: IYearMonth[]) => steps.map(({ year, month }) => `${year}-${month}`).join(',');

export const formatStep = ({ year, month }: IYearMonth) => `${getMonthLabel(month)} ${year}`;
