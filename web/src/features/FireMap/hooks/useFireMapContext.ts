import type { Map as MapLibreMap } from 'maplibre-gl';
import { createContext, useContext } from 'react';
import type { IMapLegend } from '../types/IMapLegend';

export interface IFireMapContext {
  map: MapLibreMap | null;
  setMap: (map: MapLibreMap | null) => void;
  hotspotLegend: IMapLegend | null;
  setHotspotLegend: (legend: IMapLegend | null) => void;
}

export const FireMapContext = createContext<IFireMapContext | null>(null);

export const useFireMapContext = () => {
  const context = useContext(FireMapContext);
  if (!context) throw new Error('useFireMapContext must be used inside <FireMapProvider>.');
  return context;
};
