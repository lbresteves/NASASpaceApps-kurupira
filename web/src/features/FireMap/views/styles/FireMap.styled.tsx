import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export interface IMapContainerStyledProps {
  shouldHideZoomControls: boolean;
}

const ZOOM_CONTROLS_FADE_MS = 300;
const ATTRIBUTION_Z_INDEX = 10;

export const MapContainer = styled('div', {
  shouldForwardProp: omitProps('shouldHideZoomControls'),
})<IMapContainerStyledProps>(({ shouldHideZoomControls }) => ({
  position: 'absolute',
  inset: 0,
  '& .maplibregl-ctrl-top-right': {
    opacity: shouldHideZoomControls ? 0 : 1,
    visibility: shouldHideZoomControls ? 'hidden' : 'visible',
    transition: `opacity ${ZOOM_CONTROLS_FADE_MS}ms ease, visibility 0s linear ${shouldHideZoomControls ? ZOOM_CONTROLS_FADE_MS : 0}ms`,
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  },
  // Credits stay in the screen corner above the panel, even when the page scrolls.
  '& .maplibregl-ctrl-bottom-right': {
    position: 'fixed',
    zIndex: ATTRIBUTION_Z_INDEX,
  },
}));
