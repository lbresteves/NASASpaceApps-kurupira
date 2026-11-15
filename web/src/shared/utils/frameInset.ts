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

/**
 * The frame never starts higher than this, so on short screens the app header (84px) and the
 * map data tabs above the frame (~48px) keep their room instead of overlapping the map.
 */
const FRAME_MIN_TOP_PX = 148;

const toPercent = (fraction: number) => `${Math.round(fraction * 100)}%`;

const toPercentInset = ({ top, bottom, left, right }: IInset<number>): IInset<string> => ({
  top: `max(${toPercent(top)}, ${FRAME_MIN_TOP_PX}px)`,
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
    top: Math.max(height * top, FRAME_MIN_TOP_PX) + gap,
    bottom: height * bottom + gap,
    left: width * left + gap,
    right: width * right + gap,
  };
};

const MEDIA_PREFIX = '@media ';

/** Frame padding for a map container, picking the mobile or desktop inset from a theme media query. */
export const getContainerFramePadding = (container: HTMLElement, mobileMedia: string, gap: number) => {
  const isMobile = window.matchMedia(mobileMedia.replace(MEDIA_PREFIX, '')).matches;
  return getFramePadding(container.clientWidth, container.clientHeight, isMobile, gap);
};
