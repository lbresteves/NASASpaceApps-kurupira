import type { Theme } from '@emotion/react';
import type { StyleSpecification } from 'maplibre-gl';
import { BRAZIL_ISO, BRAZIL_STATES_URL, MAP_LAYERS, MAP_SOURCES, WORLD_COUNTRIES_URL } from './constants';

const toAbsoluteUrl = (path: string) => new URL(path, window.location.origin).href;

export const buildMapStyle = (theme: Theme): StyleSpecification => ({
  version: 8,
  sources: {
    [MAP_SOURCES.world]: {
      type: 'geojson',
      data: toAbsoluteUrl(WORLD_COUNTRIES_URL),
      attribution: 'Countries: Natural Earth',
    },
    [MAP_SOURCES.states]: {
      type: 'geojson',
      data: toAbsoluteUrl(BRAZIL_STATES_URL),
      attribution: 'Brazil: IBGE',
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
      paint: { 'fill-color': theme.colors.mapWorldLand },
    },
    {
      id: MAP_LAYERS.worldBorder,
      type: 'line',
      source: MAP_SOURCES.world,
      filter: ['!=', ['get', 'iso'], BRAZIL_ISO],
      paint: { 'line-color': theme.colors.mapWorldBorder, 'line-width': 0.5 },
    },
    {
      id: MAP_LAYERS.statesFill,
      type: 'fill',
      source: MAP_SOURCES.states,
      paint: { 'fill-color': theme.colors.mapLand },
    },
    {
      id: MAP_LAYERS.statesBorder,
      type: 'line',
      source: MAP_SOURCES.states,
      paint: { 'line-color': theme.colors.mapBorder, 'line-width': 1 },
    },
  ],
});
