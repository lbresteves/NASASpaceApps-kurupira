import { apiGet } from '@shared/api';
import type { THotspotCollection } from '../utils/hotspotSeries';

export const getHotspots = (search: string, signal?: AbortSignal) =>
  apiGet<THotspotCollection>(`/hotspots?${search}`, signal);
