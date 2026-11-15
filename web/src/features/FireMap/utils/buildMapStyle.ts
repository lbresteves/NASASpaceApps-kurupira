import type { Theme } from '@emotion/react';
import type { ExpressionSpecification, StyleSpecification } from 'maplibre-gl';
import {
  BRAZIL_ISO,
  BRAZIL_STATES_URL,
  COUNTRY_ID_PROPERTY,
  MAP_LAYERS,
  MAP_SOURCES,
  REGION_FEATURE_STATE,
  REGION_LAYERS,
  STATE_ID_PROPERTY,
  WORLD_COUNTRIES_URL,
} from './constants';

const SELECTED_LINE_WIDTH = 3;

const toAbsoluteUrl = (path: string) => new URL(path, window.location.origin).href;

const whenHovered = (hoveredColor: string, color: string): ExpressionSpecification => [
  'case',
  ['boolean', ['feature-state', REGION_FEATURE_STATE.hovered], false],
  hoveredColor,
  color,
];

const HOVERED_OPACITY: ExpressionSpecification = [
  'case',
  ['boolean', ['feature-state', REGION_FEATURE_STATE.hovered], false],
  1,
  0,
];

const SELECTED_OPACITY: ExpressionSpecification = [
  'case',
  ['boolean', ['feature-state', REGION_FEATURE_STATE.selected], false],
  1,
  0,
];

export const buildMapStyle = (theme: Theme): StyleSpecification => ({
  version: 8,
  sources: {
    [MAP_SOURCES.world]: {
      type: 'geojson',
      data: toAbsoluteUrl(WORLD_COUNTRIES_URL),
      attribution: 'Countries: Natural Earth',
      promoteId: COUNTRY_ID_PROPERTY,
    },
    [MAP_SOURCES.states]: {
      type: 'geojson',
      data: toAbsoluteUrl(BRAZIL_STATES_URL),
      attribution: 'Brazil: IBGE',
      promoteId: STATE_ID_PROPERTY,
    },
  },
  layers: [
    {
      id: MAP_LAYERS.background,
      type: 'background',
      paint: { 'background-color': theme.colors.mapBackground },
    },
    {
      id: MAP_LAYERS.worldFill,
      type: 'fill',
      source: MAP_SOURCES.world,
      paint: { 'fill-color': whenHovered(theme.colors.mapWorldBorder, theme.colors.mapWorldLand) },
    },
    {
      id: MAP_LAYERS.worldBorder,
      type: 'line',
      source: MAP_SOURCES.world,
      filter: ['!=', ['get', 'iso'], BRAZIL_ISO],
      paint: { 'line-color': theme.colors.mapWorldBorder, 'line-width': 1.2 },
    },
    {
      id: MAP_LAYERS.statesFill,
      type: 'fill',
      source: MAP_SOURCES.states,
      paint: { 'fill-color': whenHovered(theme.colors.border, theme.colors.mapLand) },
    },
    {
      id: REGION_LAYERS.brazilHover,
      type: 'fill',
      source: MAP_SOURCES.world,
      filter: ['==', ['get', 'iso'], BRAZIL_ISO],
      paint: { 'fill-color': theme.colors.border, 'fill-opacity': HOVERED_OPACITY },
    },
    {
      id: MAP_LAYERS.statesBorder,
      type: 'line',
      source: MAP_SOURCES.states,
      paint: { 'line-color': theme.colors.mapBorder, 'line-width': 1.6 },
    },
    {
      id: REGION_LAYERS.worldSelected,
      type: 'line',
      source: MAP_SOURCES.world,
      paint: {
        'line-color': theme.colors.primary,
        'line-width': SELECTED_LINE_WIDTH,
        'line-opacity': SELECTED_OPACITY,
      },
    },
    {
      id: REGION_LAYERS.statesSelected,
      type: 'line',
      source: MAP_SOURCES.states,
      paint: {
        'line-color': theme.colors.primary,
        'line-width': SELECTED_LINE_WIDTH,
        'line-opacity': SELECTED_OPACITY,
      },
    },
  ],
});
