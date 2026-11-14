import { apiGet } from '@shared/api';
import type { THotspotMetric } from '@shared/types';
import type { ICalendarResponse } from '../types/ICalendar';

export const getCalendar = (metric: THotspotMetric, signal?: AbortSignal) =>
  apiGet<ICalendarResponse>(`/calendar?metric=${metric}`, signal);
