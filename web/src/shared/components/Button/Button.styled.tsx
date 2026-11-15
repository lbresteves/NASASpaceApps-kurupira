import styled from '@emotion/styled';
import type { TColorName } from '@shared/theme';
import { getContrastColorName, omitProps } from '@shared/utils';

export interface IButtonStyledProps {
  color: TColorName;
}

export const ButtonStyled = styled('button', {
  shouldForwardProp: omitProps('color'),
})<IButtonStyledProps>(({ theme, color }) => ({
  ...theme.typography.caption,
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  backgroundColor: theme.colors[color],
  color: theme.colors[getContrastColorName(theme.colors, color)],
  border: 'none',
  borderRadius: theme.radius.md,
  padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
  transition: 'filter 150ms ease',
  '&:hover': { filter: 'brightness(1.15)' },
  '&:disabled': { cursor: 'not-allowed', opacity: 0.5, filter: 'none' },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
}));
