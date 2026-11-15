import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { useFitToState } from '../hooks/useFitToState';
import { useHotspotHover } from '../hooks/useHotspotHover';
import { useHotspotsLayer } from '../hooks/useHotspotsLayer';
import type { TMapColorMode } from '../types/IHotspotProperties';
import { HoverLabel } from './styles/MapHotspots.styled';

export interface IMapHotspotsProps {
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
  mode: TMapColorMode;
}

export const MapHotspots = ({ filters, selection, mode }: IMapHotspotsProps) => {
  const isLayerReady = useHotspotsLayer(filters, selection, mode);
  const hover = useHotspotHover(isLayerReady);
  useFitToState(filters.stateCode);

  if (!hover) return null;

  return (
    <HoverLabel role="status" style={{ left: hover.x, top: hover.y }}>
      {hover.text}
    </HoverLabel>
  );
};
