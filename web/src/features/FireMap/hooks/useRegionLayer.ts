import type { IRegion } from '@shared/types';
import type { MapMouseEvent } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { REGION_FEATURE_STATE } from '../utils/constants';
import { findRegionAt, isHotspotTarget, setRegionState } from '../utils/regionFeatures';
import { useFireMapContext } from './useFireMapContext';

const useIsStyleReady = () => {
  const { map } = useFireMapContext();
  const [readyMap, setReadyMap] = useState<typeof map>(null);

  useEffect(() => {
    if (!map) return;
    const markReady = () => setReadyMap(map);
    if (map.isStyleLoaded()) markReady();
    else map.once('load', markReady);
    return () => {
      map.off('load', markReady);
    };
  }, [map]);

  return map !== null && readyMap === map;
};

export const useRegionLayer = (
  selectedRegion: IRegion | null,
  isEnabled: boolean,
  onRegionClick: (region: IRegion) => void,
) => {
  const { map } = useFireMapContext();
  const isStyleReady = useIsStyleReady();
  const onRegionClickRef = useRef(onRegionClick);

  useEffect(() => {
    onRegionClickRef.current = onRegionClick;
  }, [onRegionClick]);

  useEffect(() => {
    if (!map || !isStyleReady || !isEnabled) return;

    let hovered: IRegion | null = null;

    const clearHover = () => {
      if (hovered) setRegionState(map, hovered, { [REGION_FEATURE_STATE.hovered]: false });
      hovered = null;
    };

    const showHover = (event: MapMouseEvent) => {
      const isOnHotspot = isHotspotTarget(map, event.point);
      const region = isOnHotspot ? null : findRegionAt(map, event.point);
      if (region || !isOnHotspot) map.getCanvas().style.cursor = region ? 'pointer' : '';
      if (region?.id === hovered?.id && region?.kind === hovered?.kind) return;

      clearHover();
      if (!region) return;
      hovered = region;
      setRegionState(map, region, { [REGION_FEATURE_STATE.hovered]: true });
    };

    const selectRegion = (event: MapMouseEvent) => {
      if (isHotspotTarget(map, event.point)) return;
      const region = findRegionAt(map, event.point);
      if (region) onRegionClickRef.current(region);
    };

    const leaveMap = () => {
      clearHover();
      map.getCanvas().style.cursor = '';
    };

    map.on('mousemove', showHover);
    map.on('click', selectRegion);
    map.on('mouseout', leaveMap);

    return () => {
      leaveMap();
      map.off('mousemove', showHover);
      map.off('click', selectRegion);
      map.off('mouseout', leaveMap);
    };
  }, [map, isStyleReady, isEnabled]);

  useEffect(() => {
    if (!map || !isStyleReady || !selectedRegion) return;

    setRegionState(map, selectedRegion, { [REGION_FEATURE_STATE.selected]: true });
    return () => {
      setRegionState(map, selectedRegion, { [REGION_FEATURE_STATE.selected]: false });
    };
  }, [map, isStyleReady, selectedRegion]);
};
