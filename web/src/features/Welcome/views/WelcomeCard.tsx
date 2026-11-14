import { Button, Card, StatusDot, Typography, ViewContent } from '@shared/components';
import type { Ref } from 'react';
import { useCuiabaClock } from '../hooks/useCuiabaClock';
import { getClockStatus } from '../utils/clockStatus';
import { WelcomeContent } from './styles/WelcomeCard.styled';

export interface IWelcomeCardProps {
  onOpenPanel: () => void;
  panelButtonRef?: Ref<HTMLButtonElement>;
}

export const WelcomeCard = ({ onOpenPanel, panelButtonRef }: IWelcomeCardProps) => {
  const { text, dotColor, isDotBlinking } = getClockStatus(useCuiabaClock());

  return (
    <Card>
      <WelcomeContent centerY gap="sm">
        <Typography variant="title">Hello, Earthlings!</Typography>
        <Typography>Kurupira is warming up its satellites.</Typography>
        <ViewContent flexRow centerY gap="xs" fit>
          <StatusDot color={dotColor} isBlinking={isDotBlinking} />
          <Typography variant="caption" color="textSecondary">
            {text}
          </Typography>
        </ViewContent>
        <Button ref={panelButtonRef} onClick={onOpenPanel}>
          Panel
        </Button>
      </WelcomeContent>
    </Card>
  );
};
