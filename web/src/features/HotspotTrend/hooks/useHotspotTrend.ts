import type { IHotspotFilters, IRegion } from '@shared/types';
import { BRAZIL, buildHotspotSearch, getHotspotMetric } from '@shared/utils';
import type { ITrendSeries } from '../types/ITrend';
import { toTrendPoints } from '../utils/trendScale';
import { useMonthlySeries } from './useMonthlySeries';

export const useHotspotTrend = (filters: IHotspotFilters, region: IRegion | null) => {
  const metric = getHotspotMetric(filters);
  const stateRegion = region?.kind === 'state' ? region : null;
  const country = useMonthlySeries(buildHotspotSearch({ ...filters, stateCode: null }));
  const state = useMonthlySeries(stateRegion ? buildHotspotSearch({ ...filters, stateCode: stateRegion.id }) : null);

  const series: ITrendSeries[] = [];
  if (country.months) {
    series.push({
      id: BRAZIL.iso,
      label: BRAZIL.name,
      color: 'textSecondary',
      isDashed: true,
      points: toTrendPoints(country.months, metric),
    });
  }
  if (stateRegion && state.months) {
    series.push({
      id: stateRegion.id,
      label: stateRegion.name,
      color: 'primary',
      isDashed: false,
      points: toTrendPoints(state.months, metric),
    });
  }

  return {
    metric,
    series,
    isLoading: country.isLoading || state.isLoading,
    hasError: country.hasError || state.hasError,
  };
};
