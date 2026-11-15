import type { ISegmentOption } from '@shared/components';
import type { TMapDataMode, TOutlookMode } from '../types/IOutlook';

export const OUTLOOK_SOURCE = 'outlook';
export const OUTLOOK_LAYER = 'outlook-cells';

export const MAP_DATA_OPTIONS: ISegmentOption<TMapDataMode>[] = [
  { value: 'observed', label: 'NASA hotspots' },
  { value: 'forecast', label: 'Forecast' },
  { value: 'comparison', label: 'Dec–Jan vs average' },
];

export const toPeriod = (year: number, month: number) => `${year}-${String(month).padStart(2, '0')}`;

export const DEFAULT_PERIODS: Record<TOutlookMode, string> = {
  forecast: '2026-12',
  comparison: '2025-12',
};

export const CELL_SIZE_LABEL = '~28 km cell';

export const BASELINE_LABEL = '2012–2025';
