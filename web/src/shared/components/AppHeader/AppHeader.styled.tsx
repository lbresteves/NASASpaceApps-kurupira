import styled from '@emotion/styled';

export const APP_HEADER_HEIGHT_PX = 84;
const LOGO_SIZE_PX = 64;
const LOGO_SIZE_MOBILE_PX = 44;

export const AppHeaderContainer = styled.header(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: APP_HEADER_HEIGHT_PX,
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingInline: theme.spacing.md,
  pointerEvents: 'none',
}));

export const AppHeaderLogo = styled.img(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing.md,
  top: '50%',
  transform: 'translateY(-50%)',
  width: LOGO_SIZE_PX,
  height: LOGO_SIZE_PX,
  objectFit: 'contain',
  [theme.media.mobile]: {
    width: LOGO_SIZE_MOBILE_PX,
    height: LOGO_SIZE_MOBILE_PX,
  },
}));

export const AppHeaderTitle = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing.xs,
  textAlign: 'center',
  // Reserve the logo's width (plus a gap) on both sides so the centered text
  // never runs under the logo, and stays centered on the page.
  paddingInline: LOGO_SIZE_PX + theme.spacing.lg,
  [theme.media.mobile]: {
    gap: 0,
    paddingInline: 0,
    paddingLeft: LOGO_SIZE_MOBILE_PX + theme.spacing.md,
  },
}));

export const AppHeaderName = styled.h1(({ theme }) => ({
  ...theme.typography.title,
  margin: 0,
  color: theme.colors.textPrimary,
  // Smaller on phones so the name and tagline fit beside the logo.
  [theme.media.mobile]: theme.typography.subtitle,
}));

export const AppHeaderTagline = styled.p(({ theme }) => ({
  ...theme.typography.body,
  margin: 0,
  color: theme.colors.textSecondary,
  [theme.media.mobile]: theme.typography.caption,
}));
