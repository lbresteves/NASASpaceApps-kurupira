import styled from '@emotion/styled';
import { SLIDE_HEIGHT_PX, SLIDE_WIDTH_PX } from '../../utils/slides';

const ARROW_SIZE_PX = 18;

export const SlideFrame = styled.div(({ theme }) => ({
  aspectRatio: `${SLIDE_WIDTH_PX} / ${SLIDE_HEIGHT_PX}`,
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.surface,
  // Vertical page scroll still works; horizontal swipes go to the deck.
  touchAction: 'pan-y',
  userSelect: 'none',
}));

export const SlideImage = styled.img({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const DeckControls = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.md,
  marginTop: theme.spacing.md,
}));

export const SlideCounter = styled.span(({ theme }) => ({
  ...theme.typography.body,
  minWidth: 56,
  textAlign: 'center',
  color: theme.colors.textSecondary,
  fontVariantNumeric: 'tabular-nums',
}));

export const ArrowIcon = styled.svg({
  width: ARROW_SIZE_PX,
  height: ARROW_SIZE_PX,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});
