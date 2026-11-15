import styled from '@emotion/styled';

export const SelectField = styled.label(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  minWidth: 0,
}));

export const SelectLabel = styled.span(({ theme }) => ({
  ...theme.typography.body,
  fontWeight: 600,
}));

export const SelectInput = styled.select(({ theme }) => ({
  ...theme.typography.caption,
  fontFamily: 'inherit',
  padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
  borderRadius: theme.radius.md,
  border: `1px solid ${theme.colors.border}`,
  backgroundColor: theme.colors.background,
  color: theme.colors.textPrimary,
  cursor: 'pointer',
  accentColor: theme.colors.primary,
  '&:disabled': { cursor: 'not-allowed', opacity: 0.6 },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
}));
