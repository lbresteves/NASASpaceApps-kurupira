import { SegmentedControl } from '@shared/components';
import type { TMapDataMode } from '../types/IOutlook';
import { MAP_DATA_OPTIONS } from '../utils/constants';

export interface IMapDataControlProps {
  mode: TMapDataMode;
  onModeChange: (mode: TMapDataMode) => void;
}

export const MapDataControl = ({ mode, onModeChange }: IMapDataControlProps) => {
  return <SegmentedControl label="Map data" options={MAP_DATA_OPTIONS} value={mode} onChange={onModeChange} />;
};
