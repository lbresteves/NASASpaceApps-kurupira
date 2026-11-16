import { Modal } from '@shared/components';
import { PitchDeck } from './PitchDeck';

export interface IPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** The 30-second pitch as a slide deck. The deck mounts on open, so it always starts at slide 1. */
export const PitchModal = ({ isOpen, onClose }: IPitchModalProps) => {
  return (
    <Modal isOpen={isOpen} title="Kurupira introduction" onClose={onClose} isWide isTranslucent>
      <PitchDeck />
    </Modal>
  );
};
