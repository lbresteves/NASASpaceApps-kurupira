import type { ILegendItem } from '@shared/types';
import { Typography } from '../Typography/Typography';
import { LegendContainer, LegendItem, LegendItems, LegendSwatch } from './ColorLegend.styled';

export interface IColorLegendProps {
  title: string;
  items: ILegendItem[];
}

export const ColorLegend = ({ title, items }: IColorLegendProps) => {
  if (items.length === 0) return null;

  return (
    <LegendContainer>
      <Typography variant="caption" color="textSecondary">
        {title}
      </Typography>
      <LegendItems aria-label={title}>
        {items.map(({ color, label }) => (
          <LegendItem key={label}>
            <LegendSwatch color={color} aria-hidden="true" />
            <Typography variant="caption">{label}</Typography>
          </LegendItem>
        ))}
      </LegendItems>
    </LegendContainer>
  );
};
