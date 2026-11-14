import { useRef } from 'react';
import { useBrazilMap } from '../hooks/useBrazilMap';
import { MapContainer } from './styles/FireMap.styled';

export const FireMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useBrazilMap(containerRef);

  return <MapContainer ref={containerRef} role="region" aria-label="Map of Brazil" />;
};
