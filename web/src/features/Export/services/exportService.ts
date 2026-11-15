import { apiGet, buildApiUrl } from '@shared/api';
import type { IExportResponse } from '../types/IExport';

const EXPORT_PATH = '/export/monthly';

export const buildCsvUrl = (search: string) => buildApiUrl(`${EXPORT_PATH}?${search}&format=csv`);

export const getMonthlyExport = (search: string, signal?: AbortSignal) =>
  apiGet<IExportResponse>(`${EXPORT_PATH}?${search}&format=json`, signal);
