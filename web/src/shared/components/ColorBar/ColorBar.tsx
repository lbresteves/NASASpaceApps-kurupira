import type { TColorName } from '@shared/theme';
import { formatHotspots } from '@shared/utils';
import { Typography } from '../Typography/Typography';
import { Bar, BarContainer, BarLabel, BarLabels, BarSegment } from './ColorBar.styled';

export interface IColorBarProps {
  title: string;
  colors: TColorName[];
  breaks: number[];
  description: string;
}

export const ColorBar = ({ title, colors, breaks, description }: IColorBarProps) => {
  if (breaks.length === 0) return null;
  const segmentColors = colors.slice(0, breaks.length + 1);

  return (
    <BarContainer>
      <Typography variant="caption" color="textSecondary">
        {title}
      </Typography>
      <Bar role="img" aria-label={`${title}: ${description}`}>
        {segmentColors.map((color) => (
          <BarSegment key={color} color={color} />
        ))}
      </Bar>
      <BarLabels aria-hidden="true">
        {breaks.map((limit, index) => (
          <BarLabel key={limit} style={{ left: `${((index + 1) / segmentColors.length) * 100}%` }}>
            {formatHotspots(limit)}
          </BarLabel>
        ))}
      </BarLabels>
    </BarContainer>
  );
};
