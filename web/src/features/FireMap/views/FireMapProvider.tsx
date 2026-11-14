import type { Map as MapLibreMap } from 'maplibre-gl';
import { type PropsWithChildren, useMemo, useState } from 'react';
import { FireMapContext } from '../hooks/useFireMapContext';

export const FireMapProvider = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const value = useMemo(() => ({ map, setMap }), [map]);

  return <FireMapContext.Provider value={value}>{children}</FireMapContext.Provider>;
};
