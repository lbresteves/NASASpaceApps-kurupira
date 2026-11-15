import { apiGet } from '@shared/api';
import type { THotspotMetric } from '@shared/types';
import type { ICalendarResponse } from '../types/ICalendar';

export const getCalendar = (metric: THotspotMetric, stateCode: string | null, signal?: AbortSignal) => {
  const params = new URLSearchParams({ metric });
  if (stateCode) params.set('state', stateCode);
  return apiGet<ICalendarResponse>(`/calendar?${params.toString()}`, signal);
};
