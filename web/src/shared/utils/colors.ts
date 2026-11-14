import type { TColorName, TColors } from '@shared/theme';

// Text color that reads well on a background token: "primary" -> "primaryContrast".
export const getContrastColorName = (colors: TColors, background: TColorName): TColorName => {
  const contrastName = `${background}Contrast`;
  return contrastName in colors ? (contrastName as TColorName) : 'textPrimary';
};
