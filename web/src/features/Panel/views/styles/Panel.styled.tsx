import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';
import { FRAME_INSET } from '../../utils/constants';

const { desktop, mobile } = FRAME_INSET;

export const PanelFrame = styled.section(({ theme }) => ({
  position: 'absolute',
  inset: `${desktop.vertical} ${desktop.horizontal}`,
  zIndex: 1,
  border: `2px solid ${theme.colors.mapBorder}`,
  borderRadius: theme.radius.lg,
  boxShadow: `0 0 0 100vmax ${theme.colors.background}`,
  pointerEvents: 'none',
  [theme.media.mobile]: {
    inset: `${mobile.vertical} ${mobile.horizontal}`,
  },
}));

export type TPanelSlotPlacement = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomCenter';

interface IPanelSlotStyledProps {
  placement: TPanelSlotPlacement;
}

const slotPlacement = (placement: TPanelSlotPlacement, offset: number) => {
  if (placement === 'topLeft') return { top: offset, left: offset };
  if (placement === 'topRight') return { top: offset, right: offset };
  if (placement === 'bottomRight') return { bottom: offset, right: offset };
  return { bottom: offset, left: '50%', transform: 'translateX(-50%)' };
};

export const PanelSlot = styled('div', {
  shouldForwardProp: omitProps('placement'),
})<IPanelSlotStyledProps>(({ theme, placement }) => ({
  position: 'absolute',
  ...slotPlacement(placement, theme.spacing.md),
  '& button': { pointerEvents: 'auto' },
}));

export type TBlockerSide = 'top' | 'bottom' | 'left' | 'right';

interface IBlockerStyledProps {
  side: TBlockerSide;
}

const blockerPosition = (side: TBlockerSide, inset: typeof desktop) => {
  const { vertical, horizontal } = inset;
  if (side === 'top') return { top: 0, left: 0, right: 0, height: vertical };
  if (side === 'bottom') return { bottom: 0, left: 0, right: 0, height: vertical };
  return { top: vertical, bottom: vertical, [side]: 0, width: horizontal };
};

export const Blocker = styled('div', {
  shouldForwardProp: omitProps('side'),
})<IBlockerStyledProps>(({ theme, side }) => ({
  position: 'absolute',
  zIndex: 1,
  ...blockerPosition(side, desktop),
  [theme.media.mobile]: blockerPosition(side, mobile),
}));
