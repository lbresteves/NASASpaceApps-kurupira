import { useEffect, useState } from 'react';

const ARROW_KEYS: Record<string, -1 | 1> = { ArrowLeft: -1, ArrowRight: 1 };

/**
 * Current slide, prev/next with the arrow keys, and preloading of the neighbor slides so the
 * next one is already cached when the viewer moves on.
 */
export const useSlideDeck = (sources: string[]) => {
  const [index, setIndex] = useState(0);
  const lastIndex = sources.length - 1;
  const canGoBack = index > 0;
  const canGoForward = index < lastIndex;

  const step = (direction: -1 | 1) => setIndex((current) => Math.min(Math.max(current + direction, 0), lastIndex));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = ARROW_KEYS[event.key];
      if (!direction) return;
      event.preventDefault();
      setIndex((current) => Math.min(Math.max(current + direction, 0), lastIndex));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lastIndex]);

  useEffect(() => {
    [sources[index + 1], sources[index - 1]].forEach((src) => {
      if (src) new Image().src = src;
    });
  }, [index, sources]);

  return {
    index,
    canGoBack,
    canGoForward,
    goBack: () => step(-1),
    goForward: () => step(1),
  };
};
