import type { IHotspotFilters } from '@shared/types';
import { SENSOR_LABELS } from './constants';

export const describeSensors = ({ isModisSelected, isViirsSelected }: IHotspotFilters) => {
  if (isModisSelected && isViirsSelected) return SENSOR_LABELS.both;
  return isModisSelected ? SENSOR_LABELS.modis : SENSOR_LABELS.viirs;
};
