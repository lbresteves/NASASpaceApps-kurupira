import { useEffect, useState } from 'react';
import { getComparison, getForecast } from '../services/outlookService';
import type { TMapDataMode, TOutlookData } from '../types/IOutlook';

export const useOutlookData = (mode: TMapDataMode, period: string | null) => {
  const [data, setData] = useState<TOutlookData | null>(null);
  const [failedRequest, setFailedRequest] = useState<string | null>(null);
  const request = `${mode}:${period}`;

  useEffect(() => {
    if (mode === 'observed' || !period) return;

    const controller = new AbortController();
    const load: Promise<TOutlookData> =
      mode === 'forecast'
        ? getForecast(period, controller.signal).then((collection) => ({ mode, period, collection }))
        : getComparison(period, controller.signal).then((collection) => ({ mode, period, collection }));

    load.then(setData).catch((error: unknown) => {
      if (controller.signal.aborted) return;
      console.error('[Outlook] Could not load map data', error);
      setFailedRequest(`${mode}:${period}`);
    });

    return () => controller.abort();
  }, [mode, period]);

  const isCurrent = data !== null && data.mode === mode && data.period === period;
  return { data: isCurrent ? data : null, hasError: failedRequest === request };
};
