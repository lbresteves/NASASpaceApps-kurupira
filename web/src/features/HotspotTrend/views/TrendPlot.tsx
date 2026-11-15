import { useTheme } from '@emotion/react';
import type { ICalendarSelection, IYearMonth } from '@shared/types';
import { formatHotspots } from '@shared/utils';
import { type MouseEvent, type PointerEvent, useState } from 'react';
import type { ITrendSeries } from '../types/ITrend';
import { buildTrendGeometry, PLOT_HEIGHT } from '../utils/trendGeometry';
import { findNearestPoint, formatPointDate, getSelectionTimeRange } from '../utils/trendScale';
import { PlotSvg, PlotWrapper, TooltipBox, TooltipRow } from './styles/HotspotTrendChart.styled';

const DASH = '6 4';
const LINE_WIDTH = 2;
const MARKER_RADIUS = 4;
const SELECTION_OPACITY = 0.25;
const SELECTED_MONTH_WIDTH = 6;

export interface ITrendPlotProps {
  series: ITrendSeries[];
  width: number;
  selection: ICalendarSelection | null;
  onPointClick: (point: IYearMonth) => void;
}

export const TrendPlot = ({ series, width, selection, onPointClick }: ITrendPlotProps) => {
  const theme = useTheme();
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const { x, y, timeAt, plot, xTicks, yTicks, lines } = buildTrendGeometry(series, width);
  const reference = series[0].points;
  const hovered = hoverTime === null ? null : findNearestPoint(reference, hoverTime);
  const selectedRange = getSelectionTimeRange(selection, reference);

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setHoverTime(timeAt(event.clientX - bounds.left));
  };

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = findNearestPoint(reference, timeAt(event.clientX - bounds.left));
    if (point) onPointClick({ year: point.year, month: point.month });
  };

  const hoverX = hovered ? x(hovered.time) : 0;
  const isTooltipOnLeft = hoverX > width / 2;

  return (
    <PlotWrapper>
      <PlotSvg
        width={width}
        height={PLOT_HEIGHT}
        aria-hidden="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverTime(null)}
        onClick={handleClick}>
        {selectedRange && (
          <rect
            x={x(selectedRange.start) - SELECTED_MONTH_WIDTH / 2}
            y={plot.top}
            width={x(selectedRange.end) - x(selectedRange.start) + SELECTED_MONTH_WIDTH}
            height={plot.bottom - plot.top}
            fill={theme.colors.primary}
            opacity={SELECTION_OPACITY}
            rx={theme.radius.sm}
          />
        )}
        {yTicks.map((tick) => (
          <g key={tick.value}>
            <line
              x1={plot.left}
              x2={plot.right}
              y1={y(tick.value)}
              y2={y(tick.value)}
              stroke={theme.colors.border}
              strokeWidth={1}
            />
            <text x={plot.left - 6} y={y(tick.value)} textAnchor="end" dominantBaseline="middle">
              {tick.label}
            </text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <text key={tick.value} x={x(tick.value)} y={plot.bottom + 16} textAnchor="middle">
            {tick.label}
          </text>
        ))}

        {lines.map(({ series: item, segments }) => (
          <g key={item.id} stroke={theme.colors[item.color]} fill={theme.colors[item.color]}>
            {segments.map((segment) =>
              segment.single ? (
                <circle key={segment.path} cx={x(segment.single.time)} cy={y(segment.single.value)} r={LINE_WIDTH} />
              ) : (
                <path
                  key={segment.path}
                  d={segment.path}
                  fill="none"
                  strokeWidth={LINE_WIDTH}
                  strokeDasharray={item.isDashed ? DASH : undefined}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ),
            )}
          </g>
        ))}

        {hovered && (
          <g>
            <line
              x1={hoverX}
              x2={hoverX}
              y1={plot.top}
              y2={plot.bottom}
              stroke={theme.colors.textSecondary}
              strokeWidth={1}
            />
            {series.map((item) => {
              const point = item.points.find((candidate) => candidate.time === hovered.time);
              return (
                point && (
                  <circle
                    key={item.id}
                    cx={hoverX}
                    cy={y(point.value)}
                    r={MARKER_RADIUS}
                    fill={theme.colors[item.color]}
                    stroke={theme.colors.background}
                    strokeWidth={2}
                  />
                )
              );
            })}
          </g>
        )}
      </PlotSvg>

      {hovered && (
        <TooltipBox style={{ left: hoverX, top: plot.top }} isOnLeft={isTooltipOnLeft}>
          <strong>{formatPointDate(hovered)}</strong>
          {series.map((item) => {
            const point = item.points.find((candidate) => candidate.time === hovered.time);
            return (
              <TooltipRow key={item.id}>
                <span>{item.label}</span>
                <span>{point ? formatHotspots(point.value) : '—'}</span>
              </TooltipRow>
            );
          })}
        </TooltipBox>
      )}
    </PlotWrapper>
  );
};
