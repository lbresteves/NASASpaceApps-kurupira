import styled from '@emotion/styled';

export const CheckboxLabel = styled.label(({ theme }) => ({
  ...theme.typography.caption,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  cursor: 'pointer',
  userSelect: 'none',
}));

export const CheckboxInput = styled.input(({ theme }) => ({
  width: 16,
  height: 16,
  margin: 0,
  cursor: 'pointer',
  accentColor: theme.colors.primary,
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
}));
