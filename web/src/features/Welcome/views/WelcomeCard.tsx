import { Card, Typography } from '@shared/components';
import { useCuiabaClock } from '../hooks/useCuiabaClock';
import { getClockText } from '../utils/clockText';
import { WelcomeContent } from './styles/WelcomeCard.styled';

export const WelcomeCard = () => {
  const clockState = useCuiabaClock();

  return (
    <Card>
      <WelcomeContent centerY gap="sm">
        <Typography variant="title">Hello, Earthlings!</Typography>
        <Typography>Kurupira is warming up its satellites.</Typography>
        <Typography variant="caption" color="textSecondary" aria-live="polite">
          {getClockText(clockState)}
        </Typography>
      </WelcomeContent>
    </Card>
  );
};
