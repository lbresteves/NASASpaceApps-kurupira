import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { useHotspotsLayer } from '../hooks/useHotspotsLayer';

export interface IMapHotspotsProps {
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
}

export const MapHotspots = ({ filters, selection }: IMapHotspotsProps) => {
  useHotspotsLayer(filters, selection);
  return null;
};
