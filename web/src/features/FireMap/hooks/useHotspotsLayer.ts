import { useTheme } from '@emotion/react';
import type { IYearMonth } from '@shared/types';
import type { FeatureCollection } from 'geojson';
import type { GeoJSONSource } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import { getMonthHotspots } from '../services/hotspotsService';
import { buildHotspotsLayer } from '../utils/buildHotspotsLayer';
import { MAP_SOURCES } from '../utils/constants';
import { useFireMapContext } from './useFireMapContext';

const EMPTY_COLLECTION: FeatureCollection = { type: 'FeatureCollection', features: [] };

export const useHotspotsLayer = (month: IYearMonth | null) => {
  const { map } = useFireMapContext();
  const theme = useTheme();
  const [isLayerReady, setIsLayerReady] = useState(false);

  useEffect(() => {
    if (!map) return;

    const addLayer = () => {
      if (!map.getSource(MAP_SOURCES.hotspots)) {
        map.addSource(MAP_SOURCES.hotspots, {
          type: 'geojson',
          data: EMPTY_COLLECTION,
          attribution: 'Hotspots: NASA FIRMS, harmonized by the Kurupira team',
        });
        map.addLayer(buildHotspotsLayer(theme));
      }
      setIsLayerReady(true);
    };

    if (map.isStyleLoaded()) addLayer();
    else map.once('load', addLayer);

    return () => {
      map.off('load', addLayer);
      setIsLayerReady(false);
    };
  }, [map, theme]);

  useEffect(() => {
    if (!map || !isLayerReady) return;

    const source = map.getSource(MAP_SOURCES.hotspots) as GeoJSONSource | undefined;
    if (!month) {
      source?.setData(EMPTY_COLLECTION);
      return;
    }

    const controller = new AbortController();
    getMonthHotspots(month, controller.signal)
      .then((hotspots) => source?.setData(hotspots))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error('[FireMap] Could not load hotspots', error);
      });

    return () => controller.abort();
  }, [map, isLayerReady, month]);
};
