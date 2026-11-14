import styled from '@emotion/styled';
import type { TColorName, TRadiusName, TSpacingName } from '@shared/theme';
import { getContrastColorName, omitProps } from '@shared/utils';

export interface ICardStyledProps {
  color: TColorName;
  padding: TSpacingName;
  radius: TRadiusName;
}

export const CardContainer = styled('div', {
  shouldForwardProp: omitProps('color', 'padding', 'radius'),
})<ICardStyledProps>(({ theme, color, padding, radius }) => ({
  backgroundColor: theme.colors[color],
  color: theme.colors[getContrastColorName(theme.colors, color)],
  padding: theme.spacing[padding],
  borderRadius: theme.radius[radius],
}));
