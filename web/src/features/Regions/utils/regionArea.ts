import type { IRegion } from '@shared/types';
import type { IAreaTotals, IRegionSummaryData } from '../types/IRegionSummary';
import { getBrazilRegionLabel } from './summaryRows';

export const getRegionArea = (region: IRegion | null, summary: IRegionSummaryData | null): IAreaTotals | null => {
  if (!region || !summary) return null;
  if (region.kind === 'brazil') return summary.brazil;
  if (region.kind === 'state') return summary.states.get(region.id) ?? null;
  return null;
};

export const getRegionContext = (region: IRegion | null, summary: IRegionSummaryData | null) => {
  if (region?.kind === 'brazil') return 'Country';
  if (region?.kind !== 'state') return null;
  const state = summary?.states.get(region.id);
  return state ? getBrazilRegionLabel(state) : null;
};
