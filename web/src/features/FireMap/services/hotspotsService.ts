import { apiGet } from '@shared/api';
import type { IYearMonth } from '@shared/types';
import type { FeatureCollection, Point } from 'geojson';
import type { IHotspotProperties } from '../types/IHotspotProperties';

export const getMonthHotspots = ({ year, month }: IYearMonth, signal?: AbortSignal) =>
  apiGet<FeatureCollection<Point, IHotspotProperties>>(`/hotspots?year=${year}&month=${month}`, signal);
