import { Typography } from '@shared/components';
import { useMapScaleBar } from '../hooks/useMapScaleBar';
import { SCALE_BAR_MAX_WIDTH_PX, ScaleContainer, ScaleLine } from './styles/MapScaleBar.styled';

export const MapScaleBar = () => {
  const scaleBar = useMapScaleBar(SCALE_BAR_MAX_WIDTH_PX);
  if (!scaleBar) return null;

  return (
    <ScaleContainer role="img" aria-label={`Map scale: the bar is ${scaleBar.label}`}>
      <Typography variant="caption">{scaleBar.label}</Typography>
      <ScaleLine style={{ width: scaleBar.widthPx }} />
    </ScaleContainer>
  );
};
