import styled from '@emotion/styled';
import type { TColorName } from '@shared/theme';
import { omitProps } from '@shared/utils';

export const LegendContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
}));

export const LegendItems = styled.ul(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const LegendItem = styled.li(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
}));

export const LegendSwatch = styled('span', {
  shouldForwardProp: omitProps('color'),
})<{ color: TColorName }>(({ theme, color }) => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  borderRadius: theme.radius.sm,
  backgroundColor: theme.colors[color],
}));
