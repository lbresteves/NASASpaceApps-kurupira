import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { TColorName } from '@shared/theme';
import { omitProps } from '@shared/utils';

export interface IStatusDotStyledProps {
  color: TColorName;
  size: number;
  isBlinking: boolean;
}

export const BLINK_PERIOD_MS = 2000;

const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.2 },
});

export const Dot = styled('span', {
  shouldForwardProp: omitProps('color', 'size', 'isBlinking'),
})<IStatusDotStyledProps>(({ theme, color, size, isBlinking }) => ({
  display: 'inline-block',
  flexShrink: 0,
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: theme.colors[color],
  ...(isBlinking && {
    animation: `${blink} ${BLINK_PERIOD_MS}ms ease-in-out infinite`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
}));
