import { useEffect, useState } from 'react';
import { getCuiabaClock } from '../services/clockService';

const TICK_MS = 1000;

interface IServerClock {
  offsetMs: number;
  timeZone: string;
}

export const useCuiabaClock = () => {
  const [serverClock, setServerClock] = useState<IServerClock | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getCuiabaClock(controller.signal)
      .then((clock) => setServerClock({ offsetMs: Date.parse(clock.iso) - Date.now(), timeZone: clock.timezone }))
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

  useEffect(() => {
    if (!serverClock) return;

    const tick = () => setNow(new Date(Date.now() + serverClock.offsetMs));
    tick();
    const intervalId = setInterval(tick, TICK_MS);

    return () => clearInterval(intervalId);
  }, [serverClock]);

  return { now, timeZone: serverClock?.timeZone ?? null, isLoading, hasError };
};
