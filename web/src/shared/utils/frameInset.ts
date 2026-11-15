import type { PaddingOptions } from 'maplibre-gl';

interface IInset<T> {
  top: T;
  bottom: T;
  horizontal: T;
}

const FRAME_INSET_FRACTIONS: Record<'desktop' | 'mobile', IInset<number>> = {
  desktop: { top: 0.1, bottom: 0.32, horizontal: 0.2 },
  mobile: { top: 0.1, bottom: 0.2, horizontal: 0.04 },
};

const toPercent = (fraction: number) => `${Math.round(fraction * 100)}%`;

const toPercentInset = ({ top, bottom, horizontal }: IInset<number>): IInset<string> => ({
  top: toPercent(top),
  bottom: toPercent(bottom),
  horizontal: toPercent(horizontal),
});

export const FRAME_INSET = {
  desktop: toPercentInset(FRAME_INSET_FRACTIONS.desktop),
  mobile: toPercentInset(FRAME_INSET_FRACTIONS.mobile),
};

export const getFramePadding = (width: number, height: number, isMobile: boolean, gap: number): PaddingOptions => {
  const { top, bottom, horizontal } = FRAME_INSET_FRACTIONS[isMobile ? 'mobile' : 'desktop'];
  return {
    top: height * top + gap,
    bottom: height * bottom + gap,
    left: width * horizontal + gap,
    right: width * horizontal + gap,
  };
};
