import type { Theme } from '@emotion/react';
import type { CircleLayerSpecification, ExpressionSpecification } from 'maplibre-gl';
import { HOTSPOT_COLOR_BREAKS, MAP_LAYERS, MAP_SOURCES } from './constants';

export const buildHotspotsLayer = (theme: Theme): CircleLayerSpecification => {
  const { heat1, heat2, heat3, heat4, heat5 } = theme.colors;
  const colors = [heat2, heat3, heat4, heat5];
  const colorSteps = HOTSPOT_COLOR_BREAKS.flatMap((breakValue, index) => [breakValue, colors[index]]);

  return {
    id: MAP_LAYERS.hotspots,
    type: 'circle',
    source: MAP_SOURCES.hotspots,
    paint: {
      'circle-color': ['step', ['get', 'harmonized_hotspots'], heat1, ...colorSteps] as ExpressionSpecification,
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 1.5, 6, 4, 9, 10],
      'circle-opacity': 0.9,
    },
  };
};
