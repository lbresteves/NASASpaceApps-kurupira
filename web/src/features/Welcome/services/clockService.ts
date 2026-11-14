import { apiGet } from '@shared/api';
import type { IClock } from '../types/IClock';

export const getCuiabaClock = (signal?: AbortSignal) => apiGet<IClock>('/clock', signal);
