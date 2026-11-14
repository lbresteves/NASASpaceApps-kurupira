import { useCallback, useEffect, useRef, useState } from 'react';

export interface IAnchorPosition {
  x: number;
  y: number;
}

export const useAnchorPosition = <T extends HTMLElement>() => {
  const anchorRef = useRef<T>(null);
  const [position, setPosition] = useState<IAnchorPosition | null>(null);

  const show = useCallback(() => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect) setPosition({ x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const hide = useCallback(() => setPosition(null), []);

  useEffect(() => {
    if (!position) return;
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, [position, hide]);

  return { anchorRef, position, show, hide };
};
