import { useEffect, useRef } from 'react';

export const useFocusOnShow = <T extends HTMLElement>(isVisible: boolean) => {
  const ref = useRef<T>(null);
  const wasVisible = useRef(isVisible);

  useEffect(() => {
    if (isVisible && !wasVisible.current) ref.current?.focus();
    wasVisible.current = isVisible;
  }, [isVisible]);

  return ref;
};
