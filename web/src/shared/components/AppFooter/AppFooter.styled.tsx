import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export interface IAppFooterStyledProps {
  isFixed: boolean;
}

export const AppFooterContainer = styled('footer', {
  shouldForwardProp: omitProps('isFixed'),
})<IAppFooterStyledProps>(({ theme, isFixed }) => ({
  textAlign: 'center',
  pointerEvents: 'none',
  ...(isFixed && {
    position: 'fixed',
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1,
  }),
}));
