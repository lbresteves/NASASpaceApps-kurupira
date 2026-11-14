import { useEffect, useState } from 'react';
import { getCuiabaClock } from '../services/clockService';
import type { IClock } from '../types/IClock';

// Asks the API for the current time in Cuiabá once, when the card appears.
export const useCuiabaClock = () => {
  const [clock, setClock] = useState<IClock | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getCuiabaClock(controller.signal)
      .then(setClock)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[Welcome] Could not reach the API', error);
        setHasError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { clock, isLoading, hasError };
};
