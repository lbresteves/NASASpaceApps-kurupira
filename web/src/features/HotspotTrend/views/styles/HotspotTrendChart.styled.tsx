import styled from '@emotion/styled';
import { SectionCard } from '@shared/components';
import { omitProps, translucentSurface } from '@shared/utils';

export const ChartBox = styled(SectionCard)({});

export const ChartTitle = styled.h2(({ theme }) => ({
  ...theme.typography.body,
  margin: 0,
  fontWeight: 700,
}));

export const PlotArea = styled.div({
  position: 'relative',
  width: '100%',
  minHeight: 180,
});

export const PlotWrapper = styled.div({
  position: 'relative',
});

export const PlotSvg = styled.svg(({ theme }) => ({
  display: 'block',
  overflow: 'visible',
  touchAction: 'none',
  cursor: 'pointer',
  '& text': {
    fill: theme.colors.textSecondary,
    fontSize: 11,
    fontVariantNumeric: 'tabular-nums',
  },
}));

export const LegendList = styled.ul(({ theme }) => ({
  ...theme.typography.caption,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.md,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  color: theme.colors.textSecondary,
}));

export const LegendItem = styled.li(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
}));

interface ITooltipBoxStyledProps {
  isOnLeft: boolean;
}

export const TooltipBox = styled('div', {
  shouldForwardProp: omitProps('isOnLeft'),
})<ITooltipBoxStyledProps>(({ theme, isOnLeft }) => ({
  ...theme.typography.caption,
  position: 'absolute',
  transform: isOnLeft ? `translateX(calc(-100% - ${theme.spacing.sm}px))` : `translateX(${theme.spacing.sm}px)`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  minWidth: 140,
  padding: theme.spacing.sm,
  ...translucentSurface(theme),
  borderRadius: theme.radius.sm,
  color: theme.colors.textPrimary,
  pointerEvents: 'none',
  fontVariantNumeric: 'tabular-nums',
}));

export const TooltipRow = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
  '& span:first-of-type': { color: theme.colors.textSecondary },
}));

// A table ignores its own height, so the clipping lives on a wrapper.
export const VisuallyHidden = styled.div({
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});
