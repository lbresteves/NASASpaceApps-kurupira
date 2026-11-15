import type { FeatureCollection, Geometry, Position } from 'geojson';
import { LngLatBounds } from 'maplibre-gl';
import { STATE_ID_PROPERTY } from './constants';

const collectPositions = (geometry: Geometry): Position[] => {
  if (geometry.type === 'Polygon') return geometry.coordinates.flat();
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat(2);
  return [];
};

export const getStateBounds = (states: FeatureCollection, stateCode: string) => {
  const feature = states.features.find((item) => String(item.properties?.[STATE_ID_PROPERTY]) === stateCode);
  if (!feature) return null;

  const bounds = new LngLatBounds();
  collectPositions(feature.geometry).forEach(([longitude, latitude]) => bounds.extend([longitude, latitude]));
  return bounds.isEmpty() ? null : bounds;
};
