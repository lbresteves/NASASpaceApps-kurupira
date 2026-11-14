import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export interface IFadeStyledProps {
  isVisible: boolean;
}

export const FADE_DURATION_MS = 300;

export const FadeContainer = styled('div', {
  shouldForwardProp: omitProps('isVisible'),
})<IFadeStyledProps>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  visibility: isVisible ? 'visible' : 'hidden',
  transition: isVisible
    ? `opacity ${FADE_DURATION_MS}ms ease, visibility 0s`
    : `opacity ${FADE_DURATION_MS}ms ease, visibility 0s linear ${FADE_DURATION_MS}ms`,
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
