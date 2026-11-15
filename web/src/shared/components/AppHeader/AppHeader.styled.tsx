import styled from '@emotion/styled';

export const APP_HEADER_HEIGHT_PX = 72;
const LOGO_SIZE_PX = 56;
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
  textAlign: 'center',
  [theme.media.mobile]: {
    paddingLeft: LOGO_SIZE_MOBILE_PX + theme.spacing.sm,
  },
}));
