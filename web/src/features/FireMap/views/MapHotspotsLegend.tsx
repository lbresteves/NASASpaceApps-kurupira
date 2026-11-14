import { ColorLegend } from '@shared/components';
import { useFireMapContext } from '../hooks/useFireMapContext';
import { LegendBox } from './styles/MapHotspotsLegend.styled';

export const MapHotspotsLegend = () => {
  const { hotspotLegend } = useFireMapContext();
  if (!hotspotLegend || hotspotLegend.items.length === 0) return null;

  return (
    <LegendBox>
      <ColorLegend title={hotspotLegend.title} items={hotspotLegend.items} />
    </LegendBox>
  );
};
