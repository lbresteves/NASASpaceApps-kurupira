import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export const SegmentGroup = styled.div(({ theme }) => ({
  display: 'inline-flex',
  padding: 2,
  gap: 2,
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
}));

export const SegmentButton = styled('button', {
  shouldForwardProp: omitProps('isActive'),
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  ...theme.typography.caption,
  fontFamily: 'inherit',
  fontWeight: 600,
  padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  border: 'none',
  borderRadius: theme.radius.sm,
  cursor: 'pointer',
  backgroundColor: isActive ? theme.colors.primary : 'transparent',
  color: isActive ? theme.colors.primaryContrast : theme.colors.textSecondary,
  transition: 'background-color 150ms ease, color 150ms ease',
  '&:hover': { color: isActive ? theme.colors.primaryContrast : theme.colors.textPrimary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 1 },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
