import { useEffect, useState } from 'react';
import { getMetersPerPixel, getScaleBar, type IScaleBar } from '../utils/scaleBar';
import { useFireMapContext } from './useFireMapContext';

export const useMapScaleBar = (maxWidthPx: number) => {
  const { map } = useFireMapContext();
  const [scaleBar, setScaleBar] = useState<IScaleBar | null>(null);

  useEffect(() => {
    if (!map) return;

    const update = () => setScaleBar(getScaleBar(getMetersPerPixel(map.getCenter().lat, map.getZoom()), maxWidthPx));
    update();
    map.on('move', update);

    return () => {
      map.off('move', update);
    };
  }, [map, maxWidthPx]);

  return scaleBar;
};
