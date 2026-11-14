import styled from '@emotion/styled';

export const LegendBox = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  maxWidth: 240,
  [theme.media.mobile]: { maxWidth: 160 },
}));
