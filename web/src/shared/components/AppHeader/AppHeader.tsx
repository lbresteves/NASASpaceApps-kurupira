import logoUrl from '../../assets/logo-256.png';
import { Typography } from '../Typography/Typography';
import { AppHeaderContainer, AppHeaderLogo, AppHeaderTitle } from './AppHeader.styled';

export { APP_HEADER_HEIGHT_PX } from './AppHeader.styled';

export const PROJECT_NAME = 'Kurupira';
export const PROJECT_TAGLINE = 'Fire activity in Brazil · NASA MODIS & VIIRS data';

export const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <AppHeaderLogo src={logoUrl} alt={`${PROJECT_NAME} logo`} />
      <AppHeaderTitle>
        <Typography variant="subtitle">{PROJECT_NAME}</Typography>
        <Typography variant="caption" color="textSecondary">
          {PROJECT_TAGLINE}
        </Typography>
      </AppHeaderTitle>
    </AppHeaderContainer>
  );
};
