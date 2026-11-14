import { apiGet } from '@shared/api';
import type { FeatureCollection, Point } from 'geojson';
import type { IHotspotProperties } from '../types/IHotspotProperties';

export const getHotspots = (search: string, signal?: AbortSignal) =>
  apiGet<FeatureCollection<Point, IHotspotProperties>>(`/hotspots?${search}`, signal);
