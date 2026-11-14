import type { Map as MapLibreMap } from 'maplibre-gl';
import { type PropsWithChildren, useMemo, useState } from 'react';
import { FireMapContext } from '../hooks/useFireMapContext';
import type { IMapLegend } from '../types/IMapLegend';

export const FireMapProvider = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [hotspotLegend, setHotspotLegend] = useState<IMapLegend | null>(null);
  const value = useMemo(() => ({ map, setMap, hotspotLegend, setHotspotLegend }), [map, hotspotLegend]);

  return <FireMapContext.Provider value={value}>{children}</FireMapContext.Provider>;
};
