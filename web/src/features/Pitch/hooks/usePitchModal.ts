import { useState } from 'react';

/** The pitch opens only on demand, from the "Watch the pitch" link. */
export const usePitchModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
