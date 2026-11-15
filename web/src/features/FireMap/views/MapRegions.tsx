import type { IRegion } from '@shared/types';
import { useRegionLayer } from '../hooks/useRegionLayer';

export interface IMapRegionsProps {
  selectedRegion: IRegion | null;
  isEnabled: boolean;
  onRegionClick: (region: IRegion) => void;
}

export const MapRegions = ({ selectedRegion, isEnabled, onRegionClick }: IMapRegionsProps) => {
  useRegionLayer(selectedRegion, isEnabled, onRegionClick);
  return null;
};
