import styled from '@emotion/styled';
import { APP_HEADER_HEIGHT_PX } from '@shared/components';

export const PageContainer = styled.main({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
});

export const Overlay = styled.div(({ theme }) => ({
  position: 'absolute',
  top: APP_HEADER_HEIGHT_PX + theme.spacing.sm,
  left: theme.spacing.md,
  right: theme.spacing.md,
  maxWidth: 360,
  zIndex: 1,
  pointerEvents: 'none',
  '& > *': { pointerEvents: 'auto' },
}));

export const Footer = styled.footer(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing.md,
  left: theme.spacing.md,
  right: theme.spacing.md,
  zIndex: 1,
  textAlign: 'center',
  pointerEvents: 'none',
}));
