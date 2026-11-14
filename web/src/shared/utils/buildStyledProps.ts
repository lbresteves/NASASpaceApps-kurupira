import type { CSSObject, Theme } from '@emotion/react';
import type { ICommonStyledProps } from '@shared/types';

// Prop names consumed by buildStyledProps; filtered out so they don't reach the DOM.
export const commonStyledPropNames: (keyof ICommonStyledProps)[] = [
  'center',
  'centerX',
  'centerY',
  'flexRow',
  'absolute',
  'gap',
  'pad',
  'padV',
  'padH',
  'flex',
  'bg',
  'fit',
  'justify',
  'align',
  'radius',
];

export const buildStyledProps = (
  {
    center,
    centerX,
    centerY,
    flexRow,
    absolute,
    gap,
    pad,
    padV,
    padH,
    flex,
    bg,
    fit,
    justify,
    align,
    radius,
  }: ICommonStyledProps,
  theme: Theme,
): CSSObject => {
  const toSpacing = (value: ICommonStyledProps['gap']) =>
    typeof value === 'number' ? value : value && theme.spacing[value];
  const toRadius = (value: ICommonStyledProps['radius']) =>
    typeof value === 'number' ? value : value && theme.radius[value];

  return {
    display: 'flex',
    flexDirection: flexRow ? 'row' : 'column',
    flex: fit ? '0 0 auto' : (flex ?? 1),
    ...(centerX && { justifyContent: 'center' }),
    ...(centerY && { alignItems: 'center' }),
    ...(center && { justifyContent: 'center', alignItems: 'center' }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(gap !== undefined && { gap: toSpacing(gap) }),
    ...(pad !== undefined && { padding: toSpacing(pad) }),
    ...(padV !== undefined && { paddingBlock: toSpacing(padV) }),
    ...(padH !== undefined && { paddingInline: toSpacing(padH) }),
    ...(bg && { backgroundColor: theme.colors[bg] }),
    ...(radius !== undefined && { borderRadius: toRadius(radius) }),
    ...(absolute && { position: 'absolute' }),
  };
};
