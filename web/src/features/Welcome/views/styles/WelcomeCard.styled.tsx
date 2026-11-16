import styled from '@emotion/styled';
import { Card, ViewContent } from '@shared/components';

const CARD_BLUR_PX = 8;

export const WelcomeCardContainer = styled(Card)({
  backdropFilter: `blur(${CARD_BLUR_PX}px)`,
});

export const WelcomeContent = styled(ViewContent)({
  textAlign: 'center',
});

export const PitchLink = styled.button(({ theme }) => ({
  ...theme.typography.body,
  fontFamily: 'inherit',
  padding: 0,
  background: 'none',
  border: 'none',
  color: theme.colors.link,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  cursor: 'pointer',
  '&:hover': { color: theme.colors.textPrimary },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
}));
