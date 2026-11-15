import type { IYearMonth } from '@shared/types';
import { formatStep } from '../utils/playbackSteps';
import { PauseIcon, PlayIcon } from './PlaybackIcons';
import { PlaybackBar, PlaybackButton, PlaybackLabel } from './styles/PlaybackControl.styled';

export interface IPlaybackControlProps {
  isPlaying: boolean;
  canPlay: boolean;
  currentStep: IYearMonth | null;
  onPlay: () => void;
  onPause: () => void;
}

export const PlaybackControl = ({ isPlaying, canPlay, currentStep, onPlay, onPause }: IPlaybackControlProps) => {
  return (
    <PlaybackBar role="group" aria-label="Month playback">
      {isPlaying ? (
        <PlaybackButton label="Pause" icon={<PauseIcon />} onClick={onPause} />
      ) : (
        <PlaybackButton label="Play month by month" icon={<PlayIcon />} onClick={onPlay} disabled={!canPlay} />
      )}
      <PlaybackLabel aria-live="polite">{currentStep ? formatStep(currentStep) : 'Play'}</PlaybackLabel>
    </PlaybackBar>
  );
};
