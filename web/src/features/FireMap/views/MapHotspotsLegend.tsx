import { ColorBar } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import { buildLegendItems, COLOR_RAMPS } from '@shared/utils';
import { useFireMapContext } from '../hooks/useFireMapContext';
import type { TMapColorMode } from '../types/IHotspotProperties';
import { getSeriesBreaks, getVisibleSeries, SERIES_LABELS } from '../utils/hotspotSeries';
import { LegendBox } from './styles/MapHotspotsLegend.styled';

export interface IMapHotspotsLegendProps {
  filters: IHotspotFilters;
  mode: TMapColorMode;
}

export const MapHotspotsLegend = ({ filters, mode }: IMapHotspotsLegendProps) => {
  const { hotspots } = useFireMapContext();
  if (!hotspots || hotspots.features.length === 0) return null;

  return (
    <LegendBox>
      {getVisibleSeries(filters, mode).map((series) => {
        const breaks = getSeriesBreaks(hotspots, series);
        const description = buildLegendItems(breaks, series)
          .map((item) => item.label)
          .join(', ');
        return (
          <ColorBar
            key={series}
            title={`${SERIES_LABELS[series]} per ~28 km cell`}
            colors={COLOR_RAMPS[series]}
            breaks={breaks}
            description={description}
          />
        );
      })}
    </LegendBox>
  );
};
