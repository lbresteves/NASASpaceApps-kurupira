import { useRef } from 'react';
import { useBrazilMap } from '../hooks/useBrazilMap';
import { MapContainer } from './styles/FireMap.styled';

export interface IFireMapProps {
  shouldHideZoomControls?: boolean;
}

export const FireMap = ({ shouldHideZoomControls = false }: IFireMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useBrazilMap(containerRef);

  return (
    <MapContainer
      ref={containerRef}
      shouldHideZoomControls={shouldHideZoomControls}
      role="region"
      aria-label="Map of Brazil"
    />
  );
};
