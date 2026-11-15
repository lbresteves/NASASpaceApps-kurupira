import type { PaddingOptions } from 'maplibre-gl';

interface IInset<T> {
  top: T;
  bottom: T;
  left: T;
  right: T;
}

const FRAME_INSET_FRACTIONS: Record<'desktop' | 'mobile', IInset<number>> = {
  desktop: { top: 0.15, bottom: 0.32, left: 0.04, right: 0.36 },
  mobile: { top: 0.15, bottom: 0.2, left: 0.04, right: 0.04 },
};

const toPercent = (fraction: number) => `${Math.round(fraction * 100)}%`;

const toPercentInset = ({ top, bottom, left, right }: IInset<number>): IInset<string> => ({
  top: toPercent(top),
  bottom: toPercent(bottom),
  left: toPercent(left),
  right: toPercent(right),
});

export const FRAME_INSET = {
  desktop: toPercentInset(FRAME_INSET_FRACTIONS.desktop),
  mobile: toPercentInset(FRAME_INSET_FRACTIONS.mobile),
};

export const getFramePadding = (width: number, height: number, isMobile: boolean, gap: number): PaddingOptions => {
  const { top, bottom, left, right } = FRAME_INSET_FRACTIONS[isMobile ? 'mobile' : 'desktop'];
  return {
    top: height * top + gap,
    bottom: height * bottom + gap,
    left: width * left + gap,
    right: width * right + gap,
  };
};
