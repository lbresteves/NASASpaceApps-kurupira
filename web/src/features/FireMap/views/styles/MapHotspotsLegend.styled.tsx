import styled from '@emotion/styled';

export const LegendBox = styled.div(({ theme }) => ({
  maxWidth: 240,
  padding: theme.spacing.sm,
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  [theme.media.mobile]: { maxWidth: 160 },
}));
