import styled from '@emotion/styled';
import { FRAME_INSET, omitProps } from '@shared/utils';

const { desktop, mobile } = FRAME_INSET;

export const PanelFrame = styled.section(({ theme }) => ({
  position: 'absolute',
  inset: `${desktop.top} ${desktop.right} ${desktop.bottom} ${desktop.left}`,
  zIndex: 1,
  borderRadius: theme.radius.lg,
  boxShadow: `0 0 0 100vmax ${theme.colors.background}`,
  pointerEvents: 'none',
  [theme.media.mobile]: {
    inset: `${mobile.top} ${mobile.right} ${mobile.bottom} ${mobile.left}`,
  },
}));

export const PanelTop = styled.div(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  top: 0,
  left: desktop.left,
  right: desktop.right,
  height: desktop.top,
  display: 'flex',
  alignItems: 'flex-end',
  paddingBottom: theme.spacing.sm,
  [theme.media.mobile]: {
    left: mobile.left,
    right: mobile.right,
    height: mobile.top,
  },
}));

// Full page width, so the footer centers on the screen; the content keeps the frame insets as margins
// (percent margins resolve against this full-width box, matching the frame's percent insets).
export const PanelBelow = styled.div(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  top: `calc(100% - ${desktop.bottom} + ${theme.spacing.md}px)`,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
  paddingBottom: theme.spacing.md,
  // This full-width box overlaps the bottom of the side column on short screens; let clicks and
  // scrolling pass through its empty area so the side cards stay usable.
  pointerEvents: 'none',
  '& > *': { pointerEvents: 'auto' },
  [theme.media.mobile]: {
    top: `calc(100% - ${mobile.bottom} + ${theme.spacing.md}px)`,
  },
}));

export const PanelBelowContent = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
  marginLeft: desktop.left,
  marginRight: desktop.right,
  [theme.media.mobile]: {
    marginLeft: mobile.left,
    marginRight: mobile.right,
  },
}));

const ZOOM_CONTROLS_HEIGHT_PX = 68;

export const PanelSide = styled.aside(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  top: desktop.top,
  left: `calc(100% - ${desktop.right} + ${theme.spacing.lg}px)`,
  right: theme.spacing.xl,
  // No height cap or inner scroll: the column grows with its cards and the page scroll reaches them.
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
  paddingBottom: theme.spacing.md,
  [theme.media.mobile]: {
    top: `calc(${mobile.top} + ${theme.spacing.md * 2 + ZOOM_CONTROLS_HEIGHT_PX}px)`,
    left: 'auto',
    paddingBottom: 0,
    right: `calc(${mobile.right} + ${theme.spacing.md}px)`,
    maxWidth: '70vw',
  },
}));

export type TPanelSlotPlacement = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'bottomCenter';

interface IPanelSlotStyledProps {
  placement: TPanelSlotPlacement;
}

const slotPlacement = (placement: TPanelSlotPlacement, offset: number) => {
  if (placement === 'topLeft') return { top: offset, left: offset };
  if (placement === 'topCenter') return { top: offset, left: '50%', transform: 'translateX(-50%)' };
  if (placement === 'topRight') return { top: offset, right: offset };
  if (placement === 'bottomLeft') return { bottom: offset, left: offset };
  if (placement === 'bottomRight') return { bottom: offset, right: offset };
  return { bottom: offset, left: '50%', transform: 'translateX(-50%)' };
};

export const PanelSlot = styled('div', {
  shouldForwardProp: omitProps('placement'),
})<IPanelSlotStyledProps>(({ theme, placement }) => ({
  position: 'absolute',
  ...slotPlacement(placement, theme.spacing.md),
  '& button, & select, & input': { pointerEvents: 'auto' },
}));

interface IPanelStackStyledProps {
  isEndAligned?: boolean;
}

export const PanelStack = styled('div', {
  shouldForwardProp: omitProps('isEndAligned'),
})<IPanelStackStyledProps>(({ theme, isEndAligned = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isEndAligned ? 'flex-end' : 'flex-start',
  gap: theme.spacing.sm,
}));

export type TBlockerSide = 'top' | 'bottom' | 'left' | 'right';

interface IBlockerStyledProps {
  side: TBlockerSide;
}

const blockerPosition = (side: TBlockerSide, inset: typeof desktop) => {
  const { top, bottom } = inset;
  if (side === 'top') return { top: 0, left: 0, right: 0, height: top };
  if (side === 'bottom') return { bottom: 0, left: 0, right: 0, height: bottom };
  return { top, bottom, [side]: 0, width: inset[side] };
};

export const Blocker = styled('div', {
  shouldForwardProp: omitProps('side'),
})<IBlockerStyledProps>(({ theme, side }) => ({
  position: 'absolute',
  zIndex: 1,
  ...blockerPosition(side, desktop),
  [theme.media.mobile]: blockerPosition(side, mobile),
}));
