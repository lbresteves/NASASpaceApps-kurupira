import type { IRegion } from '@shared/types';
import type { Map as MapLibreMap, PointLike } from 'maplibre-gl';
import { getSeriesLayerId } from './buildHotspotsLayer';
import {
  BRAZIL_BOUNDS,
  BRAZIL_ISO,
  COUNTRY_CLICK_ZOOM_OFFSET,
  COUNTRY_ID_PROPERTY,
  HOTSPOT_CLICK_MIN_ZOOM,
  MAP_LAYERS,
  MAP_SOURCES,
  STATE_ID_PROPERTY,
} from './constants';
import { ALL_SERIES } from './hotspotSeries';

const REGION_SOURCES = { state: MAP_SOURCES.states, brazil: MAP_SOURCES.world, country: MAP_SOURCES.world } as const;

export const isHotspotZoom = (map: MapLibreMap) => map.getZoom() >= HOTSPOT_CLICK_MIN_ZOOM;

const isCountryZoom = (map: MapLibreMap) => {
  const brazilZoom = map.cameraForBounds(BRAZIL_BOUNDS)?.zoom;
  return brazilZoom !== undefined && map.getZoom() < brazilZoom - COUNTRY_CLICK_ZOOM_OFFSET;
};

const isHotspotAt = (map: MapLibreMap, point: PointLike) => {
  const layers = ALL_SERIES.map(getSeriesLayerId).filter((layerId) => map.getLayer(layerId));
  return layers.length > 0 && map.queryRenderedFeatures(point, { layers }).length > 0;
};

export const isHotspotTarget = (map: MapLibreMap, point: PointLike) => isHotspotZoom(map) && isHotspotAt(map, point);

export const findRegionAt = (map: MapLibreMap, point: PointLike): IRegion | null => {
  if (!isCountryZoom(map)) {
    const [state] = map.queryRenderedFeatures(point, { layers: [MAP_LAYERS.statesFill] });
    if (state) {
      return { kind: 'state', id: String(state.properties[STATE_ID_PROPERTY]), name: String(state.properties.name) };
    }
  }

  const [country] = map.queryRenderedFeatures(point, { layers: [MAP_LAYERS.worldFill] });
  if (!country) return null;

  const name = String(country.properties[COUNTRY_ID_PROPERTY]);
  if (country.properties.iso === BRAZIL_ISO) return isCountryZoom(map) ? { kind: 'brazil', id: name, name } : null;
  return { kind: 'country', id: name, name };
};

export const setRegionState = (map: MapLibreMap, region: IRegion, state: Record<string, boolean>) =>
  map.setFeatureState({ source: REGION_SOURCES[region.kind], id: region.id }, state);
