import { SegmentedControl } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import type { TMapColorMode } from '../types/IHotspotProperties';
import { canCompareSensors, MAP_COLOR_MODE_OPTIONS } from '../utils/hotspotSeries';

export interface IMapColorModeToggleProps {
  filters: IHotspotFilters;
  mode: TMapColorMode;
  onChange: (mode: TMapColorMode) => void;
}

export const MapColorModeToggle = ({ filters, mode, onChange }: IMapColorModeToggleProps) => {
  if (!canCompareSensors(filters)) return null;

  return <SegmentedControl label="Map colors" options={MAP_COLOR_MODE_OPTIONS} value={mode} onChange={onChange} />;
};
