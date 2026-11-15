import { getMonthlyExport, type IExportMonth } from '@features/Export';
import { useEffect, useState } from 'react';

interface ISeriesResult {
  search: string;
  months: IExportMonth[] | null;
  hasError: boolean;
}

export const useMonthlySeries = (search: string | null) => {
  const [result, setResult] = useState<ISeriesResult | null>(null);

  useEffect(() => {
    if (!search) return;
    const controller = new AbortController();

    getMonthlyExport(search, controller.signal)
      .then(({ months }) => setResult({ search, months, hasError: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[HotspotTrend] Could not load the monthly series', error);
        setResult({ search, months: null, hasError: true });
      });

    return () => controller.abort();
  }, [search]);

  const isCurrent = search !== null && result?.search === search;

  return {
    months: isCurrent ? result.months : null,
    hasError: isCurrent && result.hasError,
    isLoading: search !== null && !isCurrent,
  };
};
