import { useTheme } from '@emotion/react';
import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import type { FeatureCollection } from 'geojson';
import type { GeoJSONSource } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import { getHotspots } from '../services/hotspotsService';
import type { TMapColorMode } from '../types/IHotspotProperties';
import { buildSeriesColor, buildSeriesLayer, buildSeriesOffset, getSeriesLayerId } from '../utils/buildHotspotsLayer';
import { MAP_SOURCES } from '../utils/constants';
import { buildHotspotSearch } from '../utils/hotspotQuery';
import { ALL_SERIES, getSeriesBreaks, getVisibleSeries } from '../utils/hotspotSeries';
import { useFireMapContext } from './useFireMapContext';

const EMPTY_COLLECTION: FeatureCollection = { type: 'FeatureCollection', features: [] };

export const useHotspotsLayer = (
  filters: IHotspotFilters,
  selection: ICalendarSelection | null,
  mode: TMapColorMode,
) => {
  const { map, hotspots, setHotspots } = useFireMapContext();
  const theme = useTheme();
  const [isLayerReady, setIsLayerReady] = useState(false);
  const search = buildHotspotSearch(filters, selection);
  const visibleSeriesKey = getVisibleSeries(filters, mode).join(',');

  useEffect(() => {
    if (!map) return;

    const addLayers = () => {
      if (!map.getSource(MAP_SOURCES.hotspots)) {
        map.addSource(MAP_SOURCES.hotspots, {
          type: 'geojson',
          data: EMPTY_COLLECTION,
          generateId: true,
          attribution: 'Hotspots: NASA FIRMS, harmonized by the Kurupira team',
        });
        ALL_SERIES.forEach((series) => map.addLayer(buildSeriesLayer(theme, series)));
      }
      setIsLayerReady(true);
    };

    if (map.isStyleLoaded()) addLayers();
    else map.once('load', addLayers);

    return () => {
      map.off('load', addLayers);
      setIsLayerReady(false);
    };
  }, [map, theme]);

  useEffect(() => {
    if (!search) return;

    const controller = new AbortController();
    getHotspots(search, controller.signal)
      .then(setHotspots)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error('[FireMap] Could not load hotspots', error);
      });

    return () => controller.abort();
  }, [search, setHotspots]);

  useEffect(() => {
    if (!map || !isLayerReady) return;

    (map.getSource(MAP_SOURCES.hotspots) as GeoJSONSource | undefined)?.setData(hotspots ?? EMPTY_COLLECTION);

    const visibleSeries = visibleSeriesKey.split(',');
    const isComparing = visibleSeries.length > 1;

    ALL_SERIES.forEach((series) => {
      const layerId = getSeriesLayerId(series);
      const isVisible = visibleSeries.includes(series);
      map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
      if (!isVisible) return;

      const direction = !isComparing ? 0 : series === 'modis' ? -1 : 1;
      map.setPaintProperty(layerId, 'circle-color', buildSeriesColor(theme, series, getSeriesBreaks(hotspots, series)));
      map.setPaintProperty(layerId, 'circle-translate', buildSeriesOffset(direction));
    });
  }, [map, isLayerReady, hotspots, visibleSeriesKey, theme]);

  return isLayerReady;
};
