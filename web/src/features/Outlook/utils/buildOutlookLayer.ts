import type { Theme } from '@emotion/react';
import { COLOR_RAMPS } from '@shared/utils';
import type { CircleLayerSpecification, ExpressionSpecification } from 'maplibre-gl';
import { OUTLOOK_LAYER, OUTLOOK_SOURCE } from './constants';
import type { IOutlookScale } from './outlookScale';

const RADIUS_STOPS: [zoom: number, radius: number][] = [
  [3, 1.5],
  [6, 4],
  [9, 10],
];
const HOVER_SCALE = 1.6;

export const HOVERED_STATE = 'hovered';

const isHovered: ExpressionSpecification = ['boolean', ['feature-state', HOVERED_STATE], false];

const RADIUS = [
  'interpolate',
  ['linear'],
  ['zoom'],
  ...RADIUS_STOPS.flatMap(([zoom, radius]) => [zoom, ['case', isHovered, radius * HOVER_SCALE, radius]]),
] as ExpressionSpecification;

export const buildOutlookColor = (theme: Theme, scale: IOutlookScale): ExpressionSpecification | string => {
  const colors = COLOR_RAMPS[scale.ramp].map((name) => theme.colors[name]);
  if (scale.breaks.length === 0) return colors[Math.floor(colors.length / 2)];

  const steps = scale.breaks.flatMap((limit, index) => [limit, colors[index + 1]]);
  return ['step', ['get', scale.property], colors[0], ...steps] as ExpressionSpecification;
};

export const buildOutlookLayer = (theme: Theme): CircleLayerSpecification => ({
  id: OUTLOOK_LAYER,
  type: 'circle',
  source: OUTLOOK_SOURCE,
  layout: { visibility: 'none' },
  paint: {
    'circle-color': theme.colors.dataMuted,
    'circle-radius': RADIUS,
    'circle-opacity': 0.9,
    'circle-stroke-color': theme.colors.textPrimary,
    'circle-stroke-width': ['case', isHovered, 1.5, 0],
  },
});
