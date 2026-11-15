import type { IRegion } from '@shared/types';
import { useCallback, useState } from 'react';
import { isSameRegion } from '../utils/regionSelection';

export const useRegionSelection = () => {
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);

  const toggleRegion = useCallback(
    (region: IRegion) => setSelectedRegion((current) => (current && isSameRegion(current, region) ? null : region)),
    [],
  );
  const clearRegion = useCallback(() => setSelectedRegion(null), []);

  return { selectedRegion, toggleRegion, clearRegion };
};
