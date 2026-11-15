import { useTheme } from '@emotion/react';
import type { ITrendSeries } from '../types/ITrend';
import { LegendItem, LegendList } from './styles/HotspotTrendChart.styled';

const SWATCH_WIDTH = 20;

export interface ITrendLegendProps {
  series: ITrendSeries[];
}

export const TrendLegend = ({ series }: ITrendLegendProps) => {
  const theme = useTheme();

  return (
    <LegendList>
      {series.map((item) => (
        <LegendItem key={item.id}>
          <svg width={SWATCH_WIDTH} height={8} aria-hidden="true">
            <line
              x1={1}
              x2={SWATCH_WIDTH - 1}
              y1={4}
              y2={4}
              stroke={theme.colors[item.color]}
              strokeWidth={2}
              strokeDasharray={item.isDashed ? '6 4' : undefined}
              strokeLinecap="round"
            />
          </svg>
          {item.label}
        </LegendItem>
      ))}
    </LegendList>
  );
};
