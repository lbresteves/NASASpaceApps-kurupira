import { useEffect, useState } from 'react';
import { hasSeenPitch, markPitchSeen } from '../utils/pitchStorage';

/** Opens the pitch on the first visit only; afterwards it opens on demand. */
export const usePitchModal = () => {
  const [isOpen, setIsOpen] = useState(() => !hasSeenPitch());

  useEffect(() => {
    if (isOpen) markPitchSeen();
  }, [isOpen]);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
