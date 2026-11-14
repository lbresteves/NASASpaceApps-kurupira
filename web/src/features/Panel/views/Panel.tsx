import { Button } from '@shared/components';
import type { ReactNode, Ref } from 'react';
import { Blocker, PanelBelow, PanelFrame, PanelSlot, type TBlockerSide } from './styles/Panel.styled';

const BLOCKER_SIDES: TBlockerSide[] = ['top', 'bottom', 'left', 'right'];

export interface IPanelProps {
  onMapView: () => void;
  mapViewButtonRef?: Ref<HTMLButtonElement>;
  topRight?: ReactNode;
  bottomRight?: ReactNode;
  bottomCenter?: ReactNode;
  below?: ReactNode;
}

export const Panel = ({ onMapView, mapViewButtonRef, topRight, bottomRight, bottomCenter, below }: IPanelProps) => {
  return (
    <>
      {BLOCKER_SIDES.map((side) => (
        <Blocker key={side} side={side} />
      ))}
      <PanelFrame aria-label="Panel">
        <PanelSlot placement="topLeft">
          <Button ref={mapViewButtonRef} onClick={onMapView}>
            Map view
          </Button>
        </PanelSlot>
        {topRight && <PanelSlot placement="topRight">{topRight}</PanelSlot>}
        {bottomRight && <PanelSlot placement="bottomRight">{bottomRight}</PanelSlot>}
        {bottomCenter && <PanelSlot placement="bottomCenter">{bottomCenter}</PanelSlot>}
      </PanelFrame>
      {below && <PanelBelow>{below}</PanelBelow>}
    </>
  );
};
