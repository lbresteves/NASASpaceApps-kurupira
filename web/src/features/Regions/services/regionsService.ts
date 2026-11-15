import { apiGet } from '@shared/api';
import type { IRegionSummaryResponse } from '../types/IRegionSummary';

export const getRegionSummary = (search: string, signal?: AbortSignal) =>
  apiGet<IRegionSummaryResponse>(`/regions/summary?${search}`, signal);
