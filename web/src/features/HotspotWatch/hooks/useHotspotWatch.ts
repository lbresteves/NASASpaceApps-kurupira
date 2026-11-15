import { useEffect, useState } from 'react';
import { getHotspotWatch } from '../services/hotspotWatchService';
import type { IWatchMonth } from '../types/IHotspotWatch';

export const useHotspotWatch = () => {
  const [months, setMonths] = useState<IWatchMonth[]>([]);
  const [period, setPeriod] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getHotspotWatch(controller.signal)
      .then((watch) => {
        setMonths(watch.months);
        setPeriod(watch.months[0]?.period ?? null);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[HotspotWatch] Could not load the hotspot watch', error);
        setHasError(true);
      });
    return () => controller.abort();
  }, []);

  const selectedMonth = months.find((month) => month.period === period) ?? null;
  return { months, period, setPeriod, selectedMonth, hasError };
};
