import { useTheme } from '@emotion/react';
import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { buildLegendItems, getClassBreaks, getHotspotMetric, getMetricUnit } from '@shared/utils';
import type { FeatureCollection } from 'geojson';
import type { GeoJSONSource } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import { getHotspots } from '../services/hotspotsService';
import { buildHotspotColor, buildHotspotsLayer } from '../utils/buildHotspotsLayer';
import { MAP_LAYERS, MAP_SOURCES } from '../utils/constants';
import { buildHotspotSearch } from '../utils/hotspotQuery';
import { useFireMapContext } from './useFireMapContext';

const EMPTY_COLLECTION: FeatureCollection = { type: 'FeatureCollection', features: [] };

export const useHotspotsLayer = (filters: IHotspotFilters, selection: ICalendarSelection | null) => {
  const { map, setHotspotLegend } = useFireMapContext();
  const theme = useTheme();
  const [isLayerReady, setIsLayerReady] = useState(false);
  const search = buildHotspotSearch(filters, selection);
  const unit = getMetricUnit(getHotspotMetric(filters));

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
    if (!search) {
      source?.setData(EMPTY_COLLECTION);
      setHotspotLegend(null);
      return;
    }

    const controller = new AbortController();
    getHotspots(search, controller.signal)
      .then((collection) => {
        const breaks = getClassBreaks(collection.features.map((feature) => feature.properties.hotspots));
        map.setPaintProperty(MAP_LAYERS.hotspots, 'circle-color', buildHotspotColor(theme, breaks));
        source?.setData(collection);
        setHotspotLegend({ title: `Per ~28 km cell · ${unit}`, items: buildLegendItems(breaks) });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error('[FireMap] Could not load hotspots', error);
      });

    return () => controller.abort();
  }, [map, isLayerReady, search, unit, theme, setHotspotLegend]);
};
