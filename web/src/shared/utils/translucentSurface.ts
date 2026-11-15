import type { CSSObject, Theme } from '@emotion/react';

const BLUR_PX = 6;

/** Borderless, semi-transparent black with a blur of what's behind it (tooltips and hover labels). */
export const translucentSurface = (theme: Theme): CSSObject => ({
  backgroundColor: theme.colors.surfaceTranslucent,
  backdropFilter: `blur(${BLUR_PX}px)`,
  border: 'none',
});
