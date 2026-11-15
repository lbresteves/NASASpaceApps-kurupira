import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export const SegmentGroup = styled.div(({ theme }) => ({
  display: 'inline-flex',
  gap: theme.spacing.xs,
}));

export const SegmentButton = styled('button', {
  shouldForwardProp: omitProps('isActive'),
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  ...theme.typography.caption,
  fontFamily: 'inherit',
  fontWeight: isActive ? 600 : 500,
  padding: `${theme.spacing.xs + 2}px ${theme.spacing.md}px`,
  border: 'none',
  borderRadius: theme.radius.md,
  cursor: 'pointer',
  backgroundColor: isActive ? theme.colors.primarySoft : 'transparent',
  color: isActive ? theme.colors.primarySoftContrast : theme.colors.textSecondary,
  transition: 'background-color 150ms ease, color 150ms ease',
  '&:hover': { color: isActive ? theme.colors.primarySoftContrast : theme.colors.textPrimary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.primary}`, outlineOffset: 1 },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
