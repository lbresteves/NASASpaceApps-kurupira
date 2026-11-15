import { useEffect, useState } from 'react';
import { getOutlookMonths } from '../services/outlookService';
import type { IOutlookMonths } from '../types/IOutlookMonths';

export const useOutlookMonths = () => {
  const [months, setMonths] = useState<IOutlookMonths | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getOutlookMonths(controller.signal)
      .then(setMonths)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[Outlook] Could not load the outlook months', error);
        setHasError(true);
      });
    return () => controller.abort();
  }, []);

  return { months, hasError };
};
