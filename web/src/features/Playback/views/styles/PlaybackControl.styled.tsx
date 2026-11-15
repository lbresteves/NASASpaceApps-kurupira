import styled from '@emotion/styled';
import { IconButton } from '@shared/components';
import { translucentSurface } from '@shared/utils';

export const PlaybackBar = styled.div(({ theme }) => ({
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
}));

export const PlaybackButton = styled(IconButton)(({ theme }) => ({
  ...translucentSurface(theme),
  color: theme.colors.textPrimary,
  borderRadius: '50%',
  '&:hover': { backgroundColor: theme.colors.surfaceTranslucent, color: theme.colors.primarySoftContrast },
}));

export const PlaybackLabel = styled.span(({ theme }) => ({
  ...theme.typography.caption,
  minWidth: 64,
  color: theme.colors.textPrimary,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  textShadow: `0 1px 3px ${theme.colors.background}`,
}));
