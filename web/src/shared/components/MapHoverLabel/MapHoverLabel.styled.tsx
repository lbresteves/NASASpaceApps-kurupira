import styled from '@emotion/styled';
import { translucentSurface } from '@shared/utils';

const LABEL_GAP_PX = 10;

export const HoverLabel = styled.div(({ theme }) => ({
  ...theme.typography.caption,
  position: 'absolute',
  zIndex: 5,
  transform: `translate(-50%, calc(-100% - ${LABEL_GAP_PX}px))`,
  padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  ...translucentSurface(theme),
  color: theme.colors.textPrimary,
  borderRadius: theme.radius.sm,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
}));
