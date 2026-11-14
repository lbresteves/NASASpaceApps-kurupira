import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const MODAL_FADE_MS = 200;

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const Backdrop = styled.div(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing.md,
  backgroundColor: theme.colors.overlay,
  animation: `${fadeIn} ${MODAL_FADE_MS}ms ease-out`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
}));

export const Dialog = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 520,
  maxHeight: '100%',
  backgroundColor: theme.colors.surface,
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
  animation: `${riseIn} ${MODAL_FADE_MS}ms ease-out`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
}));

export const DialogHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
  padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
  borderBottom: `1px solid ${theme.colors.border}`,
}));

export const DialogBody = styled.div(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing.lg,
}));

export const DialogFooter = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing.sm,
  padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
  borderTop: `1px solid ${theme.colors.border}`,
}));

export const CloseButton = styled.button(({ theme }) => ({
  ...theme.typography.subtitle,
  width: 32,
  height: 32,
  padding: 0,
  border: 'none',
  borderRadius: theme.radius.md,
  backgroundColor: 'transparent',
  color: theme.colors.textSecondary,
  cursor: 'pointer',
  '&:hover': { color: theme.colors.textPrimary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}` },
}));
