import { Card, StatusDot, Typography, ViewContent } from '@shared/components';
import { useCuiabaClock } from '../hooks/useCuiabaClock';
import { getClockStatus } from '../utils/clockStatus';
import { WelcomeContent } from './styles/WelcomeCard.styled';

export const WelcomeCard = () => {
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
      </WelcomeContent>
    </Card>
  );
};
