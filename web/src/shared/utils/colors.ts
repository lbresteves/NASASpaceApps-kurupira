import type { TColorName, TColors } from '@shared/theme';

export const getContrastColorName = (colors: TColors, background: TColorName): TColorName => {
  const contrastName = `${background}Contrast`;
  return contrastName in colors ? (contrastName as TColorName) : 'textPrimary';
};
