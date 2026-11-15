import { Button } from '@shared/components';
import type { ReactNode, Ref } from 'react';
import {
  Blocker,
  PanelBelow,
  PanelFrame,
  PanelSide,
  PanelSlot,
  PanelStack,
  PanelTop,
  type TBlockerSide,
} from './styles/Panel.styled';

const BLOCKER_SIDES: TBlockerSide[] = ['top', 'bottom', 'left', 'right'];

export interface IPanelProps {
  onMapView: () => void;
  mapViewButtonRef?: Ref<HTMLButtonElement>;
  top?: ReactNode;
  topLeft?: ReactNode;
  topCenter?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  bottomCenter?: ReactNode;
  side?: ReactNode;
  below?: ReactNode;
}

export const Panel = ({
  onMapView,
  mapViewButtonRef,
  top,
  topLeft,
  topCenter,
  topRight,
  bottomLeft,
  bottomRight,
  bottomCenter,
  side,
  below,
}: IPanelProps) => {
  return (
    <>
      {BLOCKER_SIDES.map((side) => (
        <Blocker key={side} side={side} />
      ))}
      {top && <PanelTop>{top}</PanelTop>}
      <PanelFrame aria-label="Panel">
        <PanelSlot placement="topLeft">
          <PanelStack>
            <Button ref={mapViewButtonRef} onClick={onMapView}>
              Map view
            </Button>
            {topLeft}
          </PanelStack>
        </PanelSlot>
        {topCenter && <PanelSlot placement="topCenter">{topCenter}</PanelSlot>}
        {topRight && (
          <PanelSlot placement="topRight">
            <PanelStack isEndAligned>{topRight}</PanelStack>
          </PanelSlot>
        )}
        {bottomLeft && <PanelSlot placement="bottomLeft">{bottomLeft}</PanelSlot>}
        {bottomRight && <PanelSlot placement="bottomRight">{bottomRight}</PanelSlot>}
        {bottomCenter && <PanelSlot placement="bottomCenter">{bottomCenter}</PanelSlot>}
      </PanelFrame>
      {side && <PanelSide>{side}</PanelSide>}
      {below && <PanelBelow>{below}</PanelBelow>}
    </>
  );
};
