import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const TOOLTIP_GAP_PX = 6;

const appear = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const TooltipAnchor = styled.span({
  display: 'block',
});

export const TooltipBubble = styled.span(({ theme }) => ({
  ...theme.typography.caption,
  position: 'fixed',
  zIndex: 10,
  transform: `translate(-50%, calc(-100% - ${TOOLTIP_GAP_PX}px))`,
  padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  backgroundColor: theme.colors.surface,
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  animation: `${appear} 150ms ease-out`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
}));
