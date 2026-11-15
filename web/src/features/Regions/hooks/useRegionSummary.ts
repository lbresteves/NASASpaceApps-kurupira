import type { ICalendarSelection, IHotspotFilters } from '@shared/types';
import { buildHotspotSearch, getHotspotMetric } from '@shared/utils';
import { useEffect, useState } from 'react';
import { getRegionSummary } from '../services/regionsService';
import type { IRegionSummaryData } from '../types/IRegionSummary';

interface ISummaryResult {
  query: string;
  data: IRegionSummaryData | null;
  hasError: boolean;
}

const buildQuery = (filters: IHotspotFilters, selection: ICalendarSelection | null) => {
  const search = buildHotspotSearch(filters, selection);
  return search ? `${search}&metric=${getHotspotMetric(filters)}` : null;
};

export const useRegionSummary = (filters: IHotspotFilters, selection: ICalendarSelection | null, isActive: boolean) => {
  const [result, setResult] = useState<ISummaryResult | null>(null);
  const query = isActive ? buildQuery(filters, selection) : null;

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    getRegionSummary(query, controller.signal)
      .then(({ brazil, states }) => {
        const data = { brazil, states: new Map(states.map((state) => [state.code, state])) };
        setResult({ query, data, hasError: false });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[Regions] Could not load the region summary', error);
        setResult({ query, data: null, hasError: true });
      });

    return () => controller.abort();
  }, [query]);

  const isCurrent = query !== null && result?.query === query;

  return {
    summary: isCurrent ? result.data : null,
    hasError: isCurrent && result.hasError,
  };
};
