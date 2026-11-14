import type { TColorName } from '@shared/theme';
import type { ILegendItem } from '@shared/types';

export type TColorRamp = 'heat' | 'modis' | 'viirs' | 'harmonized';

export const COLOR_RAMPS: Record<TColorRamp, TColorName[]> = {
  heat: ['heat1', 'heat2', 'heat3', 'heat4', 'heat5'],
  modis: ['modis1', 'modis2', 'modis3', 'modis4', 'modis5'],
  viirs: ['viirs1', 'viirs2', 'viirs3', 'viirs4', 'viirs5'],
  harmonized: ['harmonized1', 'harmonized2', 'harmonized3', 'harmonized4', 'harmonized5'],
};

export const HEAT_COLOR_NAMES = COLOR_RAMPS.heat;

const CLASS_COUNT = 5;
const SIGNIFICANT_DIGITS = 2;

const roundNicely = (value: number) => Number(value.toPrecision(SIGNIFICANT_DIGITS));

export const getClassBreaks = (values: number[], classCount = CLASS_COUNT) => {
  const sorted = values.filter((value) => value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return [];

  const breaks = Array.from({ length: classCount - 1 }, (_, index) => {
    const position = Math.floor(((index + 1) / classCount) * (sorted.length - 1));
    return roundNicely(sorted[position]);
  });

  return breaks.filter((value, index) => value > 0 && value !== breaks[index - 1]);
};

export const getClassIndex = (value: number, breaks: number[]) => breaks.filter((limit) => value >= limit).length;

export const getClassColor = (value: number, breaks: number[], ramp: TColorRamp = 'heat') => {
  const colors = COLOR_RAMPS[ramp];
  return colors[getClassIndex(value, breaks)] ?? colors[colors.length - 1];
};

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

export const formatHotspots = (value: number) => numberFormat.format(value >= 10 ? Math.round(value) : value);

export const buildLegendItems = (breaks: number[], ramp: TColorRamp = 'heat'): ILegendItem[] => {
  if (breaks.length === 0) return [];
  const colors = COLOR_RAMPS[ramp];

  const first: ILegendItem = { color: colors[0], label: `< ${formatHotspots(breaks[0])}` };
  const middle = breaks.slice(1).map((limit, index) => ({
    color: colors[index + 1],
    label: `${formatHotspots(breaks[index])} – ${formatHotspots(limit)}`,
  }));
  const last: ILegendItem = { color: colors[breaks.length], label: `≥ ${formatHotspots(breaks[breaks.length - 1])}` };

  return [first, ...middle, last];
};
