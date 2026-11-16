import { type TouchEvent, useRef } from 'react';

const MIN_SWIPE_PX = 40;

/** Touch handlers that call `onSwipeLeft` / `onSwipeRight` on a mostly horizontal swipe. */
export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (event: TouchEvent) => {
      const touch = event.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
    },
    onTouchEnd: (event: TouchEvent) => {
      if (!start.current) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.current.x;
      const dy = touch.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) < MIN_SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    },
  };
};
