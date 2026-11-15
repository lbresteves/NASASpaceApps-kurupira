import type { ITrendPoint, ITrendSeries } from '../types/ITrend';
import { buildXTicks, buildYTicks, splitAtGaps } from './trendScale';

export const PLOT_HEIGHT = 180;
export const PLOT_MARGIN = { top: 8, right: 8, bottom: 24, left: 44 };

const toPath = (points: ITrendPoint[], x: (time: number) => number, y: (value: number) => number) =>
  points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.time)},${y(point.value)}`).join(' ');

export const buildTrendGeometry = (series: ITrendSeries[], width: number) => {
  const allPoints = series.flatMap((item) => item.points);
  const times = allPoints.map((point) => point.time);
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const yTicks = buildYTicks(Math.max(...allPoints.map((point) => point.value), 1));
  const yMax = yTicks[yTicks.length - 1].value;

  const plotLeft = PLOT_MARGIN.left;
  const plotRight = width - PLOT_MARGIN.right;
  const plotTop = PLOT_MARGIN.top;
  const plotBottom = PLOT_HEIGHT - PLOT_MARGIN.bottom;
  const timeSpan = Math.max(maxTime - minTime, 1);

  const x = (time: number) => plotLeft + ((time - minTime) / timeSpan) * (plotRight - plotLeft);
  const y = (value: number) => plotBottom - (value / yMax) * (plotBottom - plotTop);
  const timeAt = (pixel: number) => minTime + ((pixel - plotLeft) / (plotRight - plotLeft)) * timeSpan;

  return {
    x,
    y,
    timeAt,
    plot: { left: plotLeft, right: plotRight, top: plotTop, bottom: plotBottom },
    xTicks: buildXTicks(series[0]?.points ?? []),
    yTicks,
    lines: series.map((item) => ({
      series: item,
      segments: splitAtGaps(item.points).map((segment) => ({
        path: toPath(segment, x, y),
        single: segment.length === 1 ? segment[0] : null,
      })),
    })),
  };
};
