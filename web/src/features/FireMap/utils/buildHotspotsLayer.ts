import type { Theme } from '@emotion/react';
import { HEAT_COLOR_NAMES } from '@shared/utils';
import type { CircleLayerSpecification, ExpressionSpecification } from 'maplibre-gl';
import { MAP_LAYERS, MAP_SOURCES } from './constants';

export const buildHotspotColor = (theme: Theme, breaks: number[]): ExpressionSpecification | string => {
  const colors = HEAT_COLOR_NAMES.map((name) => theme.colors[name]);
  if (breaks.length === 0) return colors[0];

  const steps = breaks.flatMap((limit, index) => [limit, colors[index + 1]]);
  return ['step', ['get', 'hotspots'], colors[0], ...steps] as ExpressionSpecification;
};

export const buildHotspotsLayer = (theme: Theme): CircleLayerSpecification => ({
  id: MAP_LAYERS.hotspots,
  type: 'circle',
  source: MAP_SOURCES.hotspots,
  paint: {
    'circle-color': buildHotspotColor(theme, []),
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 1.5, 6, 4, 9, 10],
    'circle-opacity': 0.9,
  },
});
