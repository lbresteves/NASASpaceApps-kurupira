import { useTheme } from '@emotion/react';
import { useFireMapContext, useIsStyleReady } from '@features/FireMap';
import type { FeatureCollection } from 'geojson';
import type { GeoJSONSource } from 'maplibre-gl';
import { useEffect } from 'react';
import type { TOutlookData } from '../types/IOutlook';
import { buildOutlookColor, buildOutlookLayer } from '../utils/buildOutlookLayer';
import { OUTLOOK_LAYER, OUTLOOK_SOURCE } from '../utils/constants';
import { getOutlookScale } from '../utils/outlookScale';

const EMPTY_COLLECTION: FeatureCollection = { type: 'FeatureCollection', features: [] };

export const useOutlookLayer = (data: TOutlookData | null) => {
  const { map } = useFireMapContext();
  const theme = useTheme();
  const isStyleReady = useIsStyleReady();

  useEffect(() => {
    if (!map || !isStyleReady || map.getSource(OUTLOOK_SOURCE)) return;
    map.addSource(OUTLOOK_SOURCE, {
      type: 'geojson',
      data: EMPTY_COLLECTION,
      generateId: true,
      attribution: 'Forecast and comparison: IGNIS (Kurupira data team), from NASA FIRMS',
    });
    map.addLayer(buildOutlookLayer(theme));
  }, [map, isStyleReady, theme]);

  useEffect(() => {
    if (!map || !isStyleReady || !map.getLayer(OUTLOOK_LAYER)) return;

    (map.getSource(OUTLOOK_SOURCE) as GeoJSONSource).setData(data?.collection ?? EMPTY_COLLECTION);
    map.setLayoutProperty(OUTLOOK_LAYER, 'visibility', data ? 'visible' : 'none');
    if (data) map.setPaintProperty(OUTLOOK_LAYER, 'circle-color', buildOutlookColor(theme, getOutlookScale(data)));
  }, [map, isStyleReady, data, theme]);

  return isStyleReady;
};
