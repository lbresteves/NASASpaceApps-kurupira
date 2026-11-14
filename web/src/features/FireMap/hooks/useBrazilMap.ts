import { useTheme } from '@emotion/react';
import { Map as MapLibreMap, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type RefObject, useEffect } from 'react';
import '../utils/setupMapLibre';
import { buildMapStyle } from '../utils/buildMapStyle';
import { BRAZIL_BOUNDS } from '../utils/constants';
import { useFireMapContext } from './useFireMapContext';

export const useBrazilMap = (containerRef: RefObject<HTMLDivElement | null>) => {
  const theme = useTheme();
  const { setMap } = useFireMapContext();

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
    setMap(map);

    return () => {
      setMap(null);
      map.remove();
    };
  }, [containerRef, theme, setMap]);
};
