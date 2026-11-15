import { formatHotspots } from '@shared/utils';
import type { ITrendSeries } from '../types/ITrend';
import { formatPointDate } from '../utils/trendScale';
import { VisuallyHidden } from './styles/HotspotTrendChart.styled';

export interface ITrendTableProps {
  series: ITrendSeries[];
}

/** Text alternative for screen readers: the same numbers the chart draws. */
export const TrendTable = ({ series }: ITrendTableProps) => {
  const [reference] = series;

  return (
    <VisuallyHidden>
      <table>
        <caption>Monthly hotspots</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            {series.map((item) => (
              <th key={item.id} scope="col">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reference.points.map((point) => (
            <tr key={point.time}>
              <th scope="row">{formatPointDate(point)}</th>
              {series.map((item) => {
                const match = item.points.find((candidate) => candidate.time === point.time);
                return <td key={item.id}>{match ? formatHotspots(match.value) : '—'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </VisuallyHidden>
  );
};
