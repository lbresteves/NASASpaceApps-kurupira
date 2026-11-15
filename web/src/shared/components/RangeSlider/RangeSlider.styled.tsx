import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

const TRACK_HEIGHT_PX = 4;
const THUMB_SIZE_PX = 18;

export const RangeField = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}));

export const RangeHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
}));

export const RangeLabel = styled.span(({ theme }) => ({
  ...theme.typography.body,
  fontWeight: 600,
}));

export const RangeValue = styled.span(({ theme }) => ({
  ...theme.typography.caption,
  fontVariantNumeric: 'tabular-nums',
  color: theme.colors.textSecondary,
}));

export const RangeTrack = styled.div(({ theme }) => ({
  position: 'relative',
  height: THUMB_SIZE_PX,
  margin: `0 ${THUMB_SIZE_PX / 2}px`,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: TRACK_HEIGHT_PX,
    transform: 'translateY(-50%)',
    borderRadius: TRACK_HEIGHT_PX,
    backgroundColor: theme.colors.border,
  },
}));

interface IRangeFillStyledProps {
  startPercent: number;
  endPercent: number;
}

export const RangeFill = styled('div', {
  shouldForwardProp: omitProps('startPercent', 'endPercent'),
})<IRangeFillStyledProps>(({ theme, startPercent, endPercent }) => ({
  position: 'absolute',
  top: '50%',
  left: `${startPercent}%`,
  right: `${100 - endPercent}%`,
  height: TRACK_HEIGHT_PX,
  transform: 'translateY(-50%)',
  borderRadius: TRACK_HEIGHT_PX,
  backgroundColor: theme.colors.primary,
}));

const thumbStyle = (theme: Theme) => ({
  width: THUMB_SIZE_PX,
  height: THUMB_SIZE_PX,
  borderRadius: '50%',
  border: `2px solid ${theme.colors.background}`,
  backgroundColor: theme.colors.primary,
  cursor: 'grab',
  pointerEvents: 'auto' as const,
});

interface IRangeInputStyledProps {
  isOnTop: boolean;
}

export const RangeInput = styled('input', {
  shouldForwardProp: omitProps('isOnTop'),
})<IRangeInputStyledProps>(({ theme, isOnTop }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: isOnTop ? 2 : 1,
  width: `calc(100% + ${THUMB_SIZE_PX}px)`,
  height: THUMB_SIZE_PX,
  margin: `0 0 0 -${THUMB_SIZE_PX / 2}px`,
  background: 'none',
  pointerEvents: 'none',
  appearance: 'none',
  '&::-webkit-slider-thumb': { ...thumbStyle(theme), appearance: 'none' },
  '&::-moz-range-thumb': thumbStyle(theme),
  '&::-moz-range-track': { background: 'none' },
  '&:focus-visible': { outline: 'none' },
  '&:focus-visible::-webkit-slider-thumb': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
  '&:focus-visible::-moz-range-thumb': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
}));

export const RangeEnds = styled.div(({ theme }) => ({
  ...theme.typography.caption,
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.colors.textSecondary,
}));
