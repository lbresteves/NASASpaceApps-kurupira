import { apiGet } from '@shared/api';
import type { TComparisonCollection, TForecastCollection } from '../types/IOutlook';
import type { IOutlookMonths } from '../types/IOutlookMonths';

export const getForecast = (period: string, signal?: AbortSignal) =>
  apiGet<TForecastCollection>(`/outlook/forecast?period=${period}`, signal);

export const getComparison = (period: string, signal?: AbortSignal) =>
  apiGet<TComparisonCollection>(`/outlook/comparison?period=${period}`, signal);

export const getOutlookMonths = (signal?: AbortSignal) => apiGet<IOutlookMonths>('/outlook/months', signal);
