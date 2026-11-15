import { MapHoverLabel } from '@shared/components';
import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { useFitToState } from '../hooks/useFitToState';
import { useHotspotHover } from '../hooks/useHotspotHover';
import { useHotspotsLayer } from '../hooks/useHotspotsLayer';
import type { TMapColorMode } from '../types/IHotspotProperties';

export interface IMapHotspotsProps {
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
  mode: TMapColorMode;
  isHidden?: boolean;
}

export const MapHotspots = ({ filters, selection, mode, isHidden = false }: IMapHotspotsProps) => {
  const isLayerReady = useHotspotsLayer(filters, selection, mode, isHidden);
  const hover = useHotspotHover(isLayerReady);
  useFitToState(filters.stateCode);

  if (!hover) return null;

  return (
    <MapHoverLabel x={hover.x} y={hover.y}>
      {hover.text}
    </MapHoverLabel>
  );
};
