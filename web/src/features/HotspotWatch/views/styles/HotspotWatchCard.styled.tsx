import styled from '@emotion/styled';
import { SectionCard } from '@shared/components';
import { omitProps } from '@shared/utils';

const BAR_HEIGHT_PX = 4;
const CHEVRON_SIZE_PX = 16;

export const WatchCard = styled(SectionCard)({});

export const WatchHeading = styled.h2({
  margin: 0,
});

export const WatchToggle = styled.button(({ theme }) => ({
  ...theme.typography.body,
  fontFamily: 'inherit',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
  padding: 0,
  background: 'none',
  border: 'none',
  borderRadius: theme.radius.sm,
  color: theme.colors.textPrimary,
  textAlign: 'left',
  cursor: 'pointer',
  '&:focus-visible': { outline: `2px solid ${theme.colors.primary}`, outlineOffset: 2 },
}));

export const WatchTitle = styled.span({
  flex: 1,
  fontWeight: 700,
});

interface IChevronIconStyledProps {
  isExpanded: boolean;
}

export const ChevronIcon = styled('svg', {
  shouldForwardProp: omitProps('isExpanded'),
})<IChevronIconStyledProps>(({ theme, isExpanded }) => ({
  width: CHEVRON_SIZE_PX,
  height: CHEVRON_SIZE_PX,
  flexShrink: 0,
  fill: 'none',
  stroke: theme.colors.textSecondary,
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  transform: isExpanded ? 'rotate(180deg)' : 'none',
  transition: 'transform 200ms ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));

export const WatchBody = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  '&[hidden]': { display: 'none' },
}));

export const WatchList = styled.ol({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const WatchAreaButton = styled.button(({ theme }) => ({
  ...theme.typography.caption,
  fontFamily: 'inherit',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  rowGap: theme.spacing.xs,
  columnGap: theme.spacing.sm,
  alignItems: 'center',
  padding: `${theme.spacing.sm}px ${theme.spacing.xs}px`,
  background: 'none',
  border: 'none',
  borderRadius: theme.radius.sm,
  color: theme.colors.textPrimary,
  textAlign: 'left',
  cursor: 'pointer',
  fontVariantNumeric: 'tabular-nums',
  '&:hover': { backgroundColor: theme.colors.secondary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.primary}`, outlineOffset: -2 },
  '& strong': { fontWeight: 700 },
}));

export const WatchBarTrack = styled.span(({ theme }) => ({
  gridColumn: '1 / -1',
  height: BAR_HEIGHT_PX,
  borderRadius: BAR_HEIGHT_PX,
  backgroundColor: theme.colors.border,
  overflow: 'hidden',
}));

export const WatchBarFill = styled.span(({ theme }) => ({
  display: 'block',
  height: '100%',
  backgroundColor: theme.colors.heat3,
}));
