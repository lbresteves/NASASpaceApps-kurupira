import styled from '@emotion/styled';

export const NorthLetter = styled.text(({ theme }) => ({
  fill: theme.colors.textPrimary,
  fontFamily: 'inherit',
  fontSize: 11,
  fontWeight: 700,
}));

export const OutlineHalf = styled.polygon(({ theme }) => ({
  fill: 'none',
  stroke: theme.colors.textSecondary,
  strokeWidth: 1.5,
  strokeLinejoin: 'round',
}));

export const FilledHalf = styled.polygon(({ theme }) => ({
  fill: theme.colors.textPrimary,
  stroke: theme.colors.textPrimary,
  strokeWidth: 1.5,
  strokeLinejoin: 'round',
}));
