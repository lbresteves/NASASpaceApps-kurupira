import { useTheme } from '@emotion/react';
import { useFireMapContext } from '@features/FireMap';
import { getContainerFramePadding } from '@shared/utils';
import type { IWatchArea } from '../types/IHotspotWatch';
import { WATCH_AREA_ZOOM } from '../utils/constants';

export const useFlyToArea = () => {
  const { map } = useFireMapContext();
  const theme = useTheme();

  return ({ latitude, longitude }: IWatchArea) => {
    if (!map) return;
    const {
      top = 0,
      bottom = 0,
      left = 0,
      right = 0,
    } = getContainerFramePadding(map.getContainer(), theme.media.mobile, theme.spacing.md);
    // An offset (not padding) centers the area in the panel frame without changing the map's padding for later moves.
    map.flyTo({
      center: [longitude, latitude],
      zoom: WATCH_AREA_ZOOM,
      offset: [(left - right) / 2, (top - bottom) / 2],
    });
  };
};
