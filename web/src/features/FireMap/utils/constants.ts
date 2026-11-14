import type { LngLatBoundsLike } from 'maplibre-gl';

// [west, south] , [east, north] — mainland Brazil plus a small margin.
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
} as const;

// Drawing order: first item is at the bottom.
export const MAP_LAYERS = {
  background: 'background',
  worldFill: 'world-fill',
  worldBorder: 'world-border',
  statesFill: 'states-fill',
  statesBorder: 'states-border',
} as const;
