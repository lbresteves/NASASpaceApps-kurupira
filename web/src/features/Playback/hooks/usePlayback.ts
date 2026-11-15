import type { IHotspotFilters, IYearMonth } from '@shared/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildPlaybackSteps, getStepsKey, PLAYBACK_STEP_MS } from '../utils/playbackSteps';

interface IPlaybackState {
  stepsKey: string;
  index: number | null;
  isPlaying: boolean;
}

const IDLE: Omit<IPlaybackState, 'stepsKey'> = { index: null, isPlaying: false };

/**
 * Walks through the filtered months one per second, calling `onStep` for each one.
 * Changing the filters resets the playback.
 */
export const usePlayback = (filters: IHotspotFilters, onStep: (step: IYearMonth) => void) => {
  const { years, months } = filters;
  const steps = useMemo(() => buildPlaybackSteps({ years, months }), [years, months]);
  const stepsKey = getStepsKey(steps);
  const [state, setState] = useState<IPlaybackState>({ stepsKey, ...IDLE });
  const { index, isPlaying } = state.stepsKey === stepsKey ? state : IDLE;

  useEffect(() => {
    if (!isPlaying || index === null) return;

    const timer = window.setTimeout(() => {
      const next = index + 1;
      if (next >= steps.length) {
        setState({ stepsKey, index, isPlaying: false });
        return;
      }
      setState({ stepsKey, index: next, isPlaying: true });
      onStep(steps[next]);
    }, PLAYBACK_STEP_MS);

    return () => window.clearTimeout(timer);
  }, [isPlaying, index, steps, stepsKey, onStep]);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    const isFinished = index === null || index >= steps.length - 1;
    if (isFinished) onStep(steps[0]);
    setState({ stepsKey, index: isFinished ? 0 : index, isPlaying: true });
  }, [index, steps, stepsKey, onStep]);

  const pause = useCallback(() => setState((current) => ({ ...current, isPlaying: false })), []);

  return {
    isPlaying,
    currentStep: index === null ? null : steps[index],
    canPlay: steps.length > 1,
    play,
    pause,
  };
};
