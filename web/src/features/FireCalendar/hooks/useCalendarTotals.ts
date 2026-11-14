import type { THotspotMetric } from '@shared/types';
import { useEffect, useState } from 'react';
import { getCalendar } from '../services/calendarService';
import { getMonthKey } from '../utils/calendarCells';

interface ICalendarResult {
  metric: THotspotMetric;
  totals: Map<string, number> | null;
  hasError: boolean;
}

export const useCalendarTotals = (metric: THotspotMetric) => {
  const [result, setResult] = useState<ICalendarResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getCalendar(metric, controller.signal)
      .then(({ months }) => {
        const totals = new Map(months.map((item) => [getMonthKey(item), item.hotspots]));
        setResult({ metric, totals, hasError: false });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[FireCalendar] Could not load the calendar', error);
        setResult({ metric, totals: null, hasError: true });
      });

    return () => controller.abort();
  }, [metric]);

  const isCurrent = result?.metric === metric;

  return {
    totals: result?.totals ?? null,
    isLoading: !isCurrent,
    hasError: isCurrent && result.hasError,
  };
};
