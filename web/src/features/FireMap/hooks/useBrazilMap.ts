import { useTheme } from '@emotion/react';
import { Map as MapLibreMap, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type RefObject, useEffect } from 'react';
import '../utils/setupMapLibre';
import { buildMapStyle } from '../utils/buildMapStyle';
import { BRAZIL_BOUNDS } from '../utils/constants';

// Creates the MapLibre map inside the container and destroys it on unmount.
export const useBrazilMap = (containerRef: RefObject<HTMLDivElement | null>) => {
  const theme = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: buildMapStyle(theme),
      bounds: BRAZIL_BOUNDS,
      fitBoundsOptions: { padding: theme.spacing.lg },
      attributionControl: { compact: true },
    });
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

    return () => map.remove();
  }, [containerRef, theme]);
};
