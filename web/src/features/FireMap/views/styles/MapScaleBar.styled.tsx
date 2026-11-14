import styled from '@emotion/styled';

export const SCALE_BAR_MAX_WIDTH_PX = 100;

export const ScaleContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing.xs,
  color: theme.colors.textPrimary,
}));

export const ScaleLine = styled.div(({ theme }) => ({
  height: 6,
  border: `2px solid ${theme.colors.textPrimary}`,
  borderTop: 'none',
  transition: 'width 200ms ease-out',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
