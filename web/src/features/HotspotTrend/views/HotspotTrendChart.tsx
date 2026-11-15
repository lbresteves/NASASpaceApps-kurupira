import { Typography } from '@shared/components';
import type { ICalendarSelection, IHotspotFilters, IRegion, IYearMonth } from '@shared/types';
import { describePeriod, getMetricUnit } from '@shared/utils';
import { useElementWidth } from '../hooks/useElementWidth';
import { useHotspotTrend } from '../hooks/useHotspotTrend';
import { TrendLegend } from './TrendLegend';
import { TrendPlot } from './TrendPlot';
import { TrendTable } from './TrendTable';
import { ChartBox, ChartTitle, PlotArea } from './styles/HotspotTrendChart.styled';

export interface IHotspotTrendChartProps {
  filters: IHotspotFilters;
  region: IRegion | null;
  selection: ICalendarSelection | null;
  onPointClick: (point: IYearMonth) => void;
}

export const HotspotTrendChart = ({ filters, region, selection, onPointClick }: IHotspotTrendChartProps) => {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const { metric, series, isLoading, hasError } = useHotspotTrend(filters, region);
  const hasPoints = series.some((item) => item.points.length > 0);
  const period = describePeriod(filters, null);

  return (
    <ChartBox aria-label="Monthly hotspots over time">
      <div>
        <ChartTitle>Monthly hotspots</ChartTitle>
        <Typography variant="caption" color="textSecondary">
          {[`Monthly ${getMetricUnit(metric)}`, period].filter(Boolean).join(' · ')}
        </Typography>
      </div>

      {series.length > 0 && <TrendLegend series={series} />}

      <PlotArea ref={ref}>
        {hasPoints && width > 0 && (
          <TrendPlot series={series} width={width} selection={selection} onPointClick={onPointClick} />
        )}
        {!hasPoints && !isLoading && !hasError && (
          <Typography variant="caption" color="textSecondary">
            No hotspots in the selected period.
          </Typography>
        )}
        {isLoading && !hasPoints && (
          <Typography variant="caption" color="textSecondary">
            Loading…
          </Typography>
        )}
        {hasError && (
          <Typography variant="caption" color="error">
            Could not load the monthly series.
          </Typography>
        )}
      </PlotArea>

      {hasPoints && <TrendTable series={series} />}
    </ChartBox>
  );
};
