import { formatHotspots } from '@shared/utils';
import type { MapLayerMouseEvent } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import type { THotspotSeries } from '../types/IHotspotProperties';
import { getSeriesLayerId, HOVERED_SERIES_STATE } from '../utils/buildHotspotsLayer';
import { MAP_SOURCES } from '../utils/constants';
import { ALL_SERIES, SERIES_LABELS, type THotspotCollection } from '../utils/hotspotSeries';
import { isHotspotZoom } from '../utils/regionFeatures';
import { useFireMapContext } from './useFireMapContext';

export interface IHotspotHover {
  x: number;
  y: number;
  text: string;
  data: THotspotCollection | null;
}

export const useHotspotHover = (isLayerReady: boolean) => {
  const { map, hotspots } = useFireMapContext();
  const [hover, setHover] = useState<IHotspotHover | null>(null);

  useEffect(() => {
    if (!map || !isLayerReady) return;

    let hoveredId: string | number | undefined;

    const clearHover = () => {
      if (hoveredId === undefined) return;
      map.setFeatureState({ source: MAP_SOURCES.hotspots, id: hoveredId }, { [HOVERED_SERIES_STATE]: null });
      hoveredId = undefined;
      map.getCanvas().style.cursor = '';
      setHover(null);
    };

    const handlers = ALL_SERIES.map((series: THotspotSeries) => {
      const layerId = getSeriesLayerId(series);

      const showHover = (event: MapLayerMouseEvent) => {
        if (!isHotspotZoom(map)) {
          clearHover();
          return;
        }
        const feature = event.features?.[0];
        if (!feature || feature.id === undefined) return;

        if (hoveredId !== undefined && hoveredId !== feature.id) clearHover();
        hoveredId = feature.id;
        map.setFeatureState({ source: MAP_SOURCES.hotspots, id: feature.id }, { [HOVERED_SERIES_STATE]: series });
        map.getCanvas().style.cursor = 'pointer';

        const value = Number(feature.properties[series]);
        setHover({
          x: event.point.x,
          y: event.point.y,
          text: `${formatHotspots(value)} ${SERIES_LABELS[series]}`,
          data: hotspots,
        });
      };

      map.on('mousemove', layerId, showHover);
      map.on('click', layerId, showHover);
      map.on('mouseleave', layerId, clearHover);
      return { layerId, showHover };
    });

    return () => {
      handlers.forEach(({ layerId, showHover }) => {
        map.off('mousemove', layerId, showHover);
        map.off('click', layerId, showHover);
        map.off('mouseleave', layerId, clearHover);
      });
    };
  }, [map, isLayerReady, hotspots]);

  return hover && hover.data === hotspots ? hover : null;
};
