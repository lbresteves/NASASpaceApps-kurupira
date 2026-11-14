import { FireMap, WelcomeCard } from '@features';
import { Typography } from '@shared/components';
import { Overlay, PageContainer } from './HomePage.styled';

export const HomePage = () => {
  return (
    <PageContainer>
      <FireMap />
      <Overlay>
        <WelcomeCard />
        <Typography variant="caption" color="textSecondary">
          NASA Space Apps Challenge 2026 · Cuiabá, Brazil
        </Typography>
      </Overlay>
    </PageContainer>
  );
};
