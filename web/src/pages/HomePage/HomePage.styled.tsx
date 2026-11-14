import styled from '@emotion/styled';

export const PageContainer = styled.main({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
});

// Floats above the map, top-left.
export const Overlay = styled.div(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing.md,
  left: theme.spacing.md,
  right: theme.spacing.md,
  maxWidth: 360,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}));
