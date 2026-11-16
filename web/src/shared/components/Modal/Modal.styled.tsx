import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

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

const TRANSLUCENT_BLUR_PX = 8;
const DIALOG_MAX_WIDTH_PX = 520;
const WIDE_DIALOG_MAX_WIDTH_PX = 1200;
/** Height a wide dialog spends outside its 16:9 media: header, body padding, controls and screen margin. */
const WIDE_DIALOG_CHROME_HEIGHT_PX = 200;

export interface IDialogStyledProps {
  isTranslucent: boolean;
  isWide: boolean;
}

export const Dialog = styled('div', {
  shouldForwardProp: omitProps('isTranslucent', 'isWide'),
})<IDialogStyledProps>(({ theme, isTranslucent, isWide }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: isWide
    ? `min(${WIDE_DIALOG_MAX_WIDTH_PX}px, calc((100vh - ${WIDE_DIALOG_CHROME_HEIGHT_PX}px) * 16 / 9))`
    : DIALOG_MAX_WIDTH_PX,
  maxHeight: '100%',
  backgroundColor: isTranslucent ? theme.colors.surfaceTranslucent : theme.colors.surface,
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  ...(isTranslucent && {
    backdropFilter: `blur(${TRANSLUCENT_BLUR_PX}px)`,
    border: 'none',
    // No dividers between header, body and footer either.
    '& > div': { borderTop: 'none', borderBottom: 'none' },
  }),
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
