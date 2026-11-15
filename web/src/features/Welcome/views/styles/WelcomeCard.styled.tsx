import styled from '@emotion/styled';
import { Card, ViewContent } from '@shared/components';

const CARD_BLUR_PX = 8;

export const WelcomeCardContainer = styled(Card)({
  backdropFilter: `blur(${CARD_BLUR_PX}px)`,
});

export const WelcomeContent = styled(ViewContent)({
  textAlign: 'center',
});
