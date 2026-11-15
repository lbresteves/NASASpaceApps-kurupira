import styled from '@emotion/styled';
import { APP_HEADER_HEIGHT_PX } from '@shared/components';
import { omitProps } from '@shared/utils';

interface IPageContainerStyledProps {
  isScrollable: boolean;
}

export const PageContainer = styled('main', {
  shouldForwardProp: omitProps('isScrollable'),
})<IPageContainerStyledProps>(({ isScrollable }) => ({
  position: 'relative',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: isScrollable ? 'auto' : 'hidden',
}));

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
