import { useEffect, useState } from 'react';
import { useFireMapContext } from './useFireMapContext';

export const useIsStyleReady = () => {
  const { map } = useFireMapContext();
  const [readyMap, setReadyMap] = useState<typeof map>(null);

  useEffect(() => {
    if (!map) return;
    const markReady = () => setReadyMap(map);
    if (map.isStyleLoaded()) markReady();
    else map.once('load', markReady);
    return () => {
      map.off('load', markReady);
    };
  }, [map]);

  return map !== null && readyMap === map;
};
