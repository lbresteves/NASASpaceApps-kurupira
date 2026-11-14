import type { IYearMonth } from '@shared/types';
import { useHotspotsLayer } from '../hooks/useHotspotsLayer';

export interface IMapHotspotsProps {
  month: IYearMonth | null;
}

export const MapHotspots = ({ month }: IMapHotspotsProps) => {
  useHotspotsLayer(month);
  return null;
};
