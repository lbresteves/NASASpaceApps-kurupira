import { useCallback } from 'react';
import { useFireMapContext } from './useFireMapContext';

const SNAPSHOT_TYPE = 'image/png';

export const useMapSnapshot = () => {
  const { map } = useFireMapContext();

  return useCallback(
    () =>
      new Promise<string | null>((resolve) => {
        if (!map) {
          resolve(null);
          return;
        }
        map.once('render', () => {
          try {
            resolve(map.getCanvas().toDataURL(SNAPSHOT_TYPE));
          } catch {
            resolve(null);
          }
        });
        map.triggerRepaint();
      }),
    [map],
  );
};
