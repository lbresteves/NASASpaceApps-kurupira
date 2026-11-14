import type { Map as MapLibreMap } from 'maplibre-gl';
import { type PropsWithChildren, useMemo, useState } from 'react';
import { FireMapContext } from '../hooks/useFireMapContext';
import type { THotspotCollection } from '../utils/hotspotSeries';

export const FireMapProvider = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [hotspots, setHotspots] = useState<THotspotCollection | null>(null);
  const value = useMemo(() => ({ map, setMap, hotspots, setHotspots }), [map, hotspots]);

  return <FireMapContext.Provider value={value}>{children}</FireMapContext.Provider>;
};
