import logoUrl from '../../assets/logo-256.png';
import { AppHeaderContainer, AppHeaderLogo, AppHeaderName, AppHeaderTagline, AppHeaderTitle } from './AppHeader.styled';

export { APP_HEADER_HEIGHT_PX } from './AppHeader.styled';

export const PROJECT_NAME = 'Kurupira';
export const PROJECT_TAGLINE = "Track Brazil's fire hotspots from space with NASA satellites";

export const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <AppHeaderLogo src={logoUrl} alt={`${PROJECT_NAME} logo`} />
      <AppHeaderTitle>
        <AppHeaderName>{PROJECT_NAME}</AppHeaderName>
        <AppHeaderTagline>{PROJECT_TAGLINE}</AppHeaderTagline>
      </AppHeaderTitle>
    </AppHeaderContainer>
  );
};
