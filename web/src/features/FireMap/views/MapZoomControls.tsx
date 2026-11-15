import { useFireMapContext } from '../hooks/useFireMapContext';
import { ZoomButton, ZoomGroup } from './styles/MapZoomControls.styled';

export const MapZoomControls = () => {
  const { map } = useFireMapContext();

  return (
    <ZoomGroup role="group" aria-label="Map zoom">
      <ZoomButton color="surfaceTranslucent" aria-label="Zoom in" disabled={!map} onClick={() => map?.zoomIn()}>
        +
      </ZoomButton>
      <ZoomButton color="surfaceTranslucent" aria-label="Zoom out" disabled={!map} onClick={() => map?.zoomOut()}>
        −
      </ZoomButton>
    </ZoomGroup>
  );
};
