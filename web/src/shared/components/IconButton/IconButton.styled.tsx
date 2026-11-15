import styled from '@emotion/styled';

const ICON_BUTTON_SIZE_PX = 32;

export const IconButtonStyled = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: ICON_BUTTON_SIZE_PX,
  height: ICON_BUTTON_SIZE_PX,
  padding: 0,
  border: 'none',
  borderRadius: theme.radius.md,
  backgroundColor: 'transparent',
  color: theme.colors.textSecondary,
  cursor: 'pointer',
  transition: 'color 150ms ease, background-color 150ms ease',
  '&:hover': { color: theme.colors.textPrimary, backgroundColor: theme.colors.surface },
  '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
