import type { LngLatBoundsLike } from 'maplibre-gl';

export const BRAZIL_BOUNDS: LngLatBoundsLike = [
  [-74.5, -34.5],
  [-28.5, 5.8],
];

export const BRAZIL_ISO = 'BRA';

export const BRAZIL_STATES_URL = `${import.meta.env.BASE_URL}data/brazil-states.geojson`;
export const WORLD_COUNTRIES_URL = `${import.meta.env.BASE_URL}data/world-countries.geojson`;

export const MAP_SOURCES = {
  world: 'world',
  states: 'states',
  hotspots: 'hotspots',
} as const;

export const MAP_LAYERS = {
  background: 'background',
  worldFill: 'world-fill',
  worldBorder: 'world-border',
  statesFill: 'states-fill',
  statesBorder: 'states-border',
  hotspots: 'hotspots',
} as const;

export const HOTSPOT_COLOR_BREAKS = [1, 4, 12, 25];
