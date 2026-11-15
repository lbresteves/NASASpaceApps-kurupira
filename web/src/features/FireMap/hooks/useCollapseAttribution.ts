import { useEffect } from 'react';
import { useFireMapContext } from './useFireMapContext';

const COMPACT_SHOW_CLASS = 'maplibregl-compact-show';

/**
 * MapLibre opens the compact attribution until the first drag. When `shouldCollapse` turns on (the panel opens),
 * close it the same way MapLibre does, so it doesn't cover the panel; the (i) button still opens it.
 */
export const useCollapseAttribution = (shouldCollapse: boolean) => {
  const { map } = useFireMapContext();

  useEffect(() => {
    if (!map || !shouldCollapse) return;
    map.getContainer().querySelector('.maplibregl-ctrl-attrib')?.classList.remove(COMPACT_SHOW_CLASS);
  }, [map, shouldCollapse]);
};
