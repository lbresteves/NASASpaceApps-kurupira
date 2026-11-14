import { Card, Typography } from '@shared/components';
import { WelcomeContent } from './styles/WelcomeCard.styled';

export const WelcomeCard = () => {
  return (
    <Card>
      <WelcomeContent centerY gap="sm">
        <Typography variant="title">Hello, Earthlings!</Typography>
        <Typography>Kurupira is warming up its satellites.</Typography>
      </WelcomeContent>
    </Card>
  );
};
