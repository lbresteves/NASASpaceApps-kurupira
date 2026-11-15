import styled from '@emotion/styled';
import { Button } from '@shared/components';
import { translucentSurface } from '@shared/utils';

export const ZoomGroup = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
}));

const ZOOM_BUTTON_SIZE = 32;

export const ZoomButton = styled(Button)(({ theme }) => ({
  ...theme.typography.subtitle,
  width: ZOOM_BUTTON_SIZE,
  height: ZOOM_BUTTON_SIZE,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...translucentSurface(theme),
  // Brightness does little on translucent black, so the sign turns orange instead (same as the play button).
  '&:hover': { filter: 'none', color: theme.colors.primarySoftContrast },
}));
