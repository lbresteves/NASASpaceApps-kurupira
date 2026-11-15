import { useFireMapContext } from '@features/FireMap';
import type { MapLayerMouseEvent } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import type { IComparisonCellProperties, IForecastCellProperties, TOutlookData } from '../types/IOutlook';
import { HOVERED_STATE } from '../utils/buildOutlookLayer';
import { OUTLOOK_LAYER, OUTLOOK_SOURCE } from '../utils/constants';
import { describeComparisonCell, describeForecastCell } from '../utils/outlookLabels';

export interface IOutlookHover {
  x: number;
  y: number;
  text: string;
  data: TOutlookData;
}

export const useOutlookHover = (isLayerReady: boolean, data: TOutlookData | null) => {
  const { map } = useFireMapContext();
  const [hover, setHover] = useState<IOutlookHover | null>(null);

  useEffect(() => {
    if (!map || !isLayerReady || !data) return;

    let hoveredId: string | number | undefined;

    const clearHover = () => {
      if (hoveredId === undefined) return;
      map.setFeatureState({ source: OUTLOOK_SOURCE, id: hoveredId }, { [HOVERED_STATE]: false });
      hoveredId = undefined;
      map.getCanvas().style.cursor = '';
      setHover(null);
    };

    const showHover = (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      if (!feature || feature.id === undefined) return;

      if (hoveredId !== feature.id) clearHover();
      hoveredId = feature.id;
      map.setFeatureState({ source: OUTLOOK_SOURCE, id: feature.id }, { [HOVERED_STATE]: true });
      map.getCanvas().style.cursor = 'pointer';

      const text =
        data.mode === 'forecast'
          ? describeForecastCell(feature.properties as IForecastCellProperties)
          : describeComparisonCell(feature.properties as IComparisonCellProperties);
      setHover({ x: event.point.x, y: event.point.y, text, data });
    };

    map.on('mousemove', OUTLOOK_LAYER, showHover);
    map.on('click', OUTLOOK_LAYER, showHover);
    map.on('mouseleave', OUTLOOK_LAYER, clearHover);

    return () => {
      clearHover();
      map.off('mousemove', OUTLOOK_LAYER, showHover);
      map.off('click', OUTLOOK_LAYER, showHover);
      map.off('mouseleave', OUTLOOK_LAYER, clearHover);
    };
  }, [map, isLayerReady, data]);

  return hover && hover.data === data ? hover : null;
};
