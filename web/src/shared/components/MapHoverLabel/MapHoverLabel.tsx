import type { PropsWithChildren } from 'react';
import { HoverLabel } from './MapHoverLabel.styled';

export interface IMapHoverLabelProps extends PropsWithChildren {
  x: number;
  y: number;
}

export const MapHoverLabel = ({ x, y, children }: IMapHoverLabelProps) => {
  return (
    <HoverLabel role="status" style={{ left: x, top: y }}>
      {children}
    </HoverLabel>
  );
};
