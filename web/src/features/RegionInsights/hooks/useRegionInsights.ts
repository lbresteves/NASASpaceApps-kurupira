import type { IRegion } from '@shared/types';
import { useCallback, useState } from 'react';
import type { IRegionInsight } from '../types/IRegionInsight';
import { getRegionInsight, pushInsight, removeInsight } from '../utils/regionInsights';

export const useRegionInsights = () => {
  const [insights, setInsights] = useState<IRegionInsight[]>([]);

  const showInsight = useCallback((region: IRegion) => {
    const insight = getRegionInsight(region);
    if (insight) setInsights((stack) => pushInsight(stack, insight));
  }, []);

  const bringToFront = useCallback(
    (insight: IRegionInsight) => setInsights((stack) => pushInsight(stack, insight)),
    [],
  );

  const closeInsight = useCallback((stateCode: string) => setInsights((stack) => removeInsight(stack, stateCode)), []);

  return { insights, showInsight, bringToFront, closeInsight };
};
