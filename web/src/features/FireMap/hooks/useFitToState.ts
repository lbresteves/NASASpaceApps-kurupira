import { useTheme } from '@emotion/react';
import { getContainerFramePadding } from '@shared/utils';
import type { FeatureCollection } from 'geojson';
import type { GeoJSONSource, Map as MapLibreMap } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { BRAZIL_BOUNDS, MAP_SOURCES, STATE_FIT_MAX_ZOOM } from '../utils/constants';
import { getStateBounds } from '../utils/stateBounds';
import { useFireMapContext } from './useFireMapContext';
import { useIsStyleReady } from './useIsStyleReady';

export const useFitToState = (stateCode: string | null) => {
  const { map } = useFireMapContext();
  const theme = useTheme();
  const isStyleReady = useIsStyleReady();
  const fittedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!map || !isStyleReady || fittedCodeRef.current === stateCode) return;
    fittedCodeRef.current = stateCode;

    const getPadding = (target: MapLibreMap) =>
      getContainerFramePadding(target.getContainer(), theme.media.mobile, theme.spacing.md);

    if (!stateCode) {
      map.fitBounds(BRAZIL_BOUNDS, { padding: getPadding(map) });
      return;
    }

    let isCancelled = false;
    map
      .getSource<GeoJSONSource>(MAP_SOURCES.states)
      ?.getData()
      .then((data) => {
        const bounds = getStateBounds(data as FeatureCollection, stateCode);
        if (!isCancelled && bounds) map.fitBounds(bounds, { padding: getPadding(map), maxZoom: STATE_FIT_MAX_ZOOM });
      })
      .catch((error: unknown) => console.error('[FireMap] Could not focus the state', error));

    return () => {
      isCancelled = true;
    };
  }, [map, isStyleReady, stateCode, theme]);
};
