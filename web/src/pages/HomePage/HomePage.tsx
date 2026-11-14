import { WelcomeCard } from '@features';
import { Typography } from '@shared/components';
import { PageContainer } from './HomePage.styled';

export const HomePage = () => {
  return (
    <PageContainer>
      <WelcomeCard />
      <Typography variant="caption" color="textSecondary">
        NASA Space Apps Challenge 2026 · Cuiabá, Brazil
      </Typography>
    </PageContainer>
  );
};
