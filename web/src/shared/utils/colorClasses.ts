import type { TColorName } from '@shared/theme';
import type { ILegendItem } from '@shared/types';

export const HEAT_COLOR_NAMES: TColorName[] = ['heat1', 'heat2', 'heat3', 'heat4', 'heat5'];

const SIGNIFICANT_DIGITS = 2;

const roundNicely = (value: number) => Number(value.toPrecision(SIGNIFICANT_DIGITS));

export const getClassBreaks = (values: number[], classCount = HEAT_COLOR_NAMES.length) => {
  const sorted = values.filter((value) => value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return [];

  const breaks = Array.from({ length: classCount - 1 }, (_, index) => {
    const position = Math.floor(((index + 1) / classCount) * (sorted.length - 1));
    return roundNicely(sorted[position]);
  });

  return breaks.filter((value, index) => value > 0 && value !== breaks[index - 1]);
};

export const getClassIndex = (value: number, breaks: number[]) => breaks.filter((limit) => value >= limit).length;

export const getClassColor = (value: number, breaks: number[]) =>
  HEAT_COLOR_NAMES[getClassIndex(value, breaks)] ?? HEAT_COLOR_NAMES[HEAT_COLOR_NAMES.length - 1];

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

export const formatHotspots = (value: number) => numberFormat.format(value >= 10 ? Math.round(value) : value);

export const buildLegendItems = (breaks: number[]): ILegendItem[] => {
  if (breaks.length === 0) return [];

  const first: ILegendItem = { color: HEAT_COLOR_NAMES[0], label: `< ${formatHotspots(breaks[0])}` };
  const middle = breaks.slice(1).map((limit, index) => ({
    color: HEAT_COLOR_NAMES[index + 1],
    label: `${formatHotspots(breaks[index])} – ${formatHotspots(limit)}`,
  }));
  const last: ILegendItem = {
    color: HEAT_COLOR_NAMES[breaks.length],
    label: `≥ ${formatHotspots(breaks[breaks.length - 1])}`,
  };

  return [first, ...middle, last];
};
