import type { TColorName } from '@shared/theme';

export interface ITrendPoint {
  year: number;
  month: number;
  /** Months since year 0, so consecutive months differ by exactly 1. */
  time: number;
  value: number;
}

export interface ITrendSeries {
  id: string;
  label: string;
  color: TColorName;
  isDashed: boolean;
  points: ITrendPoint[];
}

export interface ITrendTick {
  value: number;
  label: string;
}
