import type { THotspotMetric } from '@shared/types';
import { useEffect, useState } from 'react';
import { getCalendar } from '../services/calendarService';
import { getMonthKey } from '../utils/calendarCells';

interface ICalendarResult {
  key: string;
  totals: Map<string, number> | null;
  hasError: boolean;
}

export const useCalendarTotals = (metric: THotspotMetric, stateCode: string | null) => {
  const [result, setResult] = useState<ICalendarResult | null>(null);
  const key = `${metric}|${stateCode ?? ''}`;

  useEffect(() => {
    const controller = new AbortController();

    getCalendar(metric, stateCode, controller.signal)
      .then(({ months }) => {
        const totals = new Map(months.map((item) => [getMonthKey(item), item.hotspots]));
        setResult({ key, totals, hasError: false });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[FireCalendar] Could not load the calendar', error);
        setResult({ key, totals: null, hasError: true });
      });

    return () => controller.abort();
  }, [key, metric, stateCode]);

  const isCurrent = result?.key === key;

  return {
    totals: isCurrent ? result.totals : null,
    isLoading: !isCurrent,
    hasError: isCurrent && result.hasError,
  };
};
