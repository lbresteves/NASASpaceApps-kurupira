import { useTheme } from '@emotion/react';
import { useCallback, useSyncExternalStore } from 'react';

const MEDIA_PREFIX = '@media ';

/** True while the screen matches the theme's mobile breakpoint; updates when it is resized across it. */
export const useIsMobile = () => {
  const query = useTheme().media.mobile.replace(MEDIA_PREFIX, '');

  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
};
