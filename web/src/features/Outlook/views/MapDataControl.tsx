import { InfoButton, SegmentedControl, ViewContent } from '@shared/components';
import type { TMapDataMode } from '../types/IOutlook';
import { MAP_DATA_OPTIONS } from '../utils/constants';
import { MapDataInfo } from './MapDataInfo';

export interface IMapDataControlProps {
  mode: TMapDataMode;
  onModeChange: (mode: TMapDataMode) => void;
}

export const MapDataControl = ({ mode, onModeChange }: IMapDataControlProps) => {
  return (
    <ViewContent flexRow centerY gap="xs" fit>
      <SegmentedControl label="Map data" options={MAP_DATA_OPTIONS} value={mode} onChange={onModeChange} />
      <InfoButton label="About the map views" title="About the map views">
        <MapDataInfo />
      </InfoButton>
    </ViewContent>
  );
};
