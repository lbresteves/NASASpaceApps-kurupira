import { getClassBreaks, type TColorRamp } from '@shared/utils';
import type { TOutlookData } from '../types/IOutlook';

const NEAR_AVERAGE_QUANTILE = 0.25;
const STRONG_QUANTILE = 0.75;
const SIGNIFICANT_DIGITS = 2;

export interface IOutlookScale {
  property: 'expected' | 'anomaly';
  ramp: TColorRamp;
  breaks: number[];
}

const quantile = (sorted: number[], fraction: number) =>
  Number(sorted[Math.floor(fraction * (sorted.length - 1))].toPrecision(SIGNIFICANT_DIGITS));

/**
 * Symmetric breaks around zero for the diverging ramp: [-strong, -near, near, strong].
 * The middle class (|anomaly| < near) reads as "close to the average".
 */
export const getAnomalyBreaks = (anomalies: number[]) => {
  const magnitudes = anomalies
    .map(Math.abs)
    .filter((value) => value > 0)
    .sort((a, b) => a - b);
  if (magnitudes.length === 0) return [];

  const near = quantile(magnitudes, NEAR_AVERAGE_QUANTILE);
  const strong = Math.max(quantile(magnitudes, STRONG_QUANTILE), near * 2);
  return [-strong, -near, near, strong];
};

export const getOutlookScale = (data: TOutlookData): IOutlookScale => {
  if (data.mode === 'forecast') {
    const values = data.collection.features.map((feature) => feature.properties.expected);
    return { property: 'expected', ramp: 'heat', breaks: getClassBreaks(values) };
  }
  const values = data.collection.features.map((feature) => feature.properties.anomaly);
  return { property: 'anomaly', ramp: 'anomaly', breaks: getAnomalyBreaks(values) };
};
