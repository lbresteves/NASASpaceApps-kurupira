import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export type TCloseButtonSize = 'sm' | 'md';

export interface ICloseButtonStyledProps {
  size: TCloseButtonSize;
}

const BUTTON_SIZE_PX: Record<TCloseButtonSize, number> = { sm: 20, md: 32 };

export const CloseButtonStyled = styled('button', {
  shouldForwardProp: omitProps('size'),
})<ICloseButtonStyledProps>(({ theme, size }) => ({
  ...(size === 'md' ? theme.typography.subtitle : theme.typography.body),
  width: BUTTON_SIZE_PX[size],
  height: BUTTON_SIZE_PX[size],
  padding: 0,
  flexShrink: 0,
  border: 'none',
  borderRadius: theme.radius.md,
  backgroundColor: 'transparent',
  color: theme.colors.textSecondary,
  cursor: 'pointer',
  lineHeight: 1,
  '&:hover': { color: theme.colors.textPrimary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}` },
}));
