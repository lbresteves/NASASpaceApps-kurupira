import { apiGet } from '@shared/api';
import type { IHotspotWatch } from '../types/IHotspotWatch';

export const getHotspotWatch = (signal?: AbortSignal) => apiGet<IHotspotWatch>('/outlook/watch', signal);
