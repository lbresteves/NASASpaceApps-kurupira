import { useState } from 'react';
import type { TMapDataMode, TOutlookMode } from '../types/IOutlook';
import { DEFAULT_PERIODS } from '../utils/constants';

export const useMapDataSelection = () => {
  const [mode, setMode] = useState<TMapDataMode>('observed');
  const [periods, setPeriods] = useState<Record<TOutlookMode, string>>(DEFAULT_PERIODS);

  const isObserved = mode === 'observed';
  const period = isObserved ? null : periods[mode];
  const setPeriod = (value: string) => {
    if (!isObserved) setPeriods((current) => ({ ...current, [mode]: value }));
  };

  const showForecast = (forecastPeriod: string) => {
    setPeriods((current) => ({ ...current, forecast: forecastPeriod }));
    setMode('forecast');
  };

  return { mode, setMode, period, setPeriod, isObserved, showForecast };
};
