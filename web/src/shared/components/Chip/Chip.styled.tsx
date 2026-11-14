import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { TColorName } from '@shared/theme';
import { omitProps } from '@shared/utils';

export interface IChipStyledProps {
  color: TColorName;
  height: number;
  isSelected: boolean;
}

const HOVER_SCALE = 1.2;

const chipStyles = ({ theme, color, height, isSelected }: IChipStyledProps & { theme: Theme }) => ({
  display: 'block',
  width: '100%',
  minWidth: height,
  height,
  padding: 0,
  border: 'none',
  font: 'inherit',
  borderRadius: theme.radius.sm,
  backgroundColor: theme.colors[color],
  outline: isSelected ? `2px solid ${theme.colors.textPrimary}` : 'none',
  outlineOffset: 2,
  transition: 'background-color 300ms ease, transform 150ms ease-out',
  '&:hover': { transform: `scale(${HOVER_SCALE})` },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}` },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
});

const shouldForwardProp = omitProps('color', 'height', 'isSelected');

export const ChipBox = styled('span', { shouldForwardProp })<IChipStyledProps>(chipStyles);

export const ChipButton = styled('button', { shouldForwardProp })<IChipStyledProps>((props) => ({
  ...chipStyles(props),
  cursor: 'pointer',
}));
