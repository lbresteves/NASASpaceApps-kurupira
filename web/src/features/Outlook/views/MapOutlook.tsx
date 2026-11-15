import { MapHoverLabel } from '@shared/components';
import { useOutlookHover } from '../hooks/useOutlookHover';
import { useOutlookLayer } from '../hooks/useOutlookLayer';
import type { TOutlookData } from '../types/IOutlook';

export interface IMapOutlookProps {
  data: TOutlookData | null;
}

export const MapOutlook = ({ data }: IMapOutlookProps) => {
  const isLayerReady = useOutlookLayer(data);
  const hover = useOutlookHover(isLayerReady, data);

  if (!hover) return null;

  return (
    <MapHoverLabel x={hover.x} y={hover.y}>
      {hover.text}
    </MapHoverLabel>
  );
};
