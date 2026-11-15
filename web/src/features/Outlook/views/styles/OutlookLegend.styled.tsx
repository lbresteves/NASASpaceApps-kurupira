import styled from '@emotion/styled';

export const LegendBox = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  maxWidth: 300,
  [theme.media.mobile]: { maxWidth: 200 },
}));
