import { Button, InfoButton, StatusDot, Typography, ViewContent } from '@shared/components';
import type { Ref } from 'react';
import { useCuiabaClock } from '../hooks/useCuiabaClock';
import { getClockStatus } from '../utils/clockStatus';
import { SensorInfo } from './SensorInfo';
import { PitchLink, WelcomeCardContainer, WelcomeContent } from './styles/WelcomeCard.styled';

export interface IWelcomeCardProps {
  onOpenPanel: () => void;
  panelButtonRef?: Ref<HTMLButtonElement>;
  onOpenPitch?: () => void;
}

export const WelcomeCard = ({ onOpenPanel, panelButtonRef, onOpenPitch }: IWelcomeCardProps) => {
  const { text, dotColor, isDotBlinking } = getClockStatus(useCuiabaClock());

  return (
    <WelcomeCardContainer color="surfaceTranslucent">
      <WelcomeContent centerY gap="sm">
        <Typography variant="title">Hello, Earthlings!</Typography>
        <ViewContent flexRow centerY gap="xs" fit>
          <Typography>Where there&apos;s smoke, there&apos;s data. Open the Panel.</Typography>
          <InfoButton label="About MODIS and VIIRS" title="About the satellite data">
            <SensorInfo />
          </InfoButton>
        </ViewContent>
        <ViewContent flexRow centerY gap="xs" fit>
          <StatusDot color={dotColor} isBlinking={isDotBlinking} />
          <Typography variant="caption" color="textSecondary">
            {text}
          </Typography>
        </ViewContent>
        <Button ref={panelButtonRef} onClick={onOpenPanel}>
          Panel
        </Button>
        {onOpenPitch && (
          <PitchLink type="button" onClick={onOpenPitch}>
            See introduction
          </PitchLink>
        )}
      </WelcomeContent>
    </WelcomeCardContainer>
  );
};
