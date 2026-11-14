import styled from '@emotion/styled';
import type { TColorName } from '@shared/theme';
import { omitProps } from '@shared/utils';

const BAR_HEIGHT_PX = 10;

export const BarContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  minWidth: 160,
}));

export const Bar = styled.div(({ theme }) => ({
  display: 'flex',
  height: BAR_HEIGHT_PX,
  borderRadius: theme.radius.sm,
  overflow: 'hidden',
}));

export const BarSegment = styled('span', {
  shouldForwardProp: omitProps('color'),
})<{ color: TColorName }>(({ theme, color }) => ({
  flex: 1,
  backgroundColor: theme.colors[color],
}));

export const BarLabels = styled.div(({ theme }) => ({
  position: 'relative',
  height: theme.typography.caption.fontSize,
  marginBottom: theme.spacing.xs,
}));

export const BarLabel = styled.span(({ theme }) => ({
  ...theme.typography.caption,
  position: 'absolute',
  top: 0,
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  color: theme.colors.textPrimary,
}));
