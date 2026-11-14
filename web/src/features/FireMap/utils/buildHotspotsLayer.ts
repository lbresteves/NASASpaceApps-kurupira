import type { Theme } from '@emotion/react';
import { COLOR_RAMPS } from '@shared/utils';
import type { CircleLayerSpecification, ExpressionSpecification } from 'maplibre-gl';
import type { THotspotSeries } from '../types/IHotspotProperties';
import { MAP_SOURCES } from './constants';

const RADIUS_STOPS: [zoom: number, radius: number][] = [
  [3, 1.5],
  [6, 4],
  [9, 10],
];
const HOVER_SCALE = 1.6;

export const HOVERED_SERIES_STATE = 'hoveredSeries';

const isHovered = (series: THotspotSeries): ExpressionSpecification => [
  '==',
  ['feature-state', HOVERED_SERIES_STATE],
  series,
];

const buildSeriesRadius = (series: THotspotSeries) =>
  [
    'interpolate',
    ['linear'],
    ['zoom'],
    ...RADIUS_STOPS.flatMap(([zoom, radius]) => [zoom, ['case', isHovered(series), radius * HOVER_SCALE, radius]]),
  ] as ExpressionSpecification;

export const getSeriesLayerId = (series: THotspotSeries) => `hotspots-${series}`;

export const buildSeriesColor = (
  theme: Theme,
  series: THotspotSeries,
  breaks: number[],
): ExpressionSpecification | string => {
  const colors = COLOR_RAMPS[series].map((name) => theme.colors[name]);
  if (breaks.length === 0) return colors[0];

  const steps = breaks.flatMap((limit, index) => [limit, colors[index + 1]]);
  return ['step', ['get', series], colors[0], ...steps] as ExpressionSpecification;
};

export const buildSeriesOffset = (direction: -1 | 0 | 1): ExpressionSpecification =>
  [
    'interpolate',
    ['linear'],
    ['zoom'],
    ...RADIUS_STOPS.flatMap(([zoom, radius]) => [zoom, ['literal', [radius * direction, 0]]]),
  ] as ExpressionSpecification;

export const buildSeriesLayer = (theme: Theme, series: THotspotSeries): CircleLayerSpecification => ({
  id: getSeriesLayerId(series),
  type: 'circle',
  source: MAP_SOURCES.hotspots,
  filter: ['>', ['get', series], 0],
  layout: { visibility: 'none' },
  paint: {
    'circle-color': buildSeriesColor(theme, series, []),
    'circle-radius': buildSeriesRadius(series),
    'circle-opacity': 0.9,
    'circle-stroke-color': theme.colors.textPrimary,
    'circle-stroke-width': ['case', isHovered(series), 1.5, 0],
  },
});
