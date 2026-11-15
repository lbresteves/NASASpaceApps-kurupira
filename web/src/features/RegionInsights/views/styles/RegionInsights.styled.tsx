import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

const CARD_WIDTH_PX = 320;
const BACKDROP_BLUR_PX = 6;

export const InsightStack = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing.sm,
}));

interface IInsightCardStyledProps {
  isOpen: boolean;
}

export const InsightCard = styled('article', {
  shouldForwardProp: omitProps('isOpen'),
})<IInsightCardStyledProps>(({ theme, isOpen }) => ({
  pointerEvents: 'auto',
  width: CARD_WIDTH_PX,
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  padding: isOpen ? theme.spacing.md : `${theme.spacing.sm}px ${theme.spacing.md}px`,
  backgroundColor: theme.colors.surfaceTranslucent,
  backdropFilter: `blur(${BACKDROP_BLUR_PX}px)`,
  borderRadius: theme.radius.lg,
  color: theme.colors.textPrimary,
}));

export const InsightHeading = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.sm,
}));

export const InsightTitle = styled.h3(({ theme }) => ({
  ...theme.typography.body,
  flex: 1,
  margin: 0,
  fontWeight: 700,
}));

export const InsightTitleButton = styled.button(({ theme }) => ({
  ...theme.typography.caption,
  fontFamily: 'inherit',
  fontWeight: 700,
  flex: 1,
  padding: 0,
  background: 'none',
  border: 'none',
  borderRadius: theme.radius.sm,
  color: theme.colors.textPrimary,
  textAlign: 'left',
  cursor: 'pointer',
  '&:hover': { color: theme.colors.primarySoftContrast },
  '&:focus-visible': { outline: `2px solid ${theme.colors.primary}`, outlineOffset: 2 },
}));

export const InsightText = styled.p(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
}));

export const InsightReference = styled.p(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
  alignSelf: 'flex-end',
  color: theme.colors.textSecondary,
  fontStyle: 'italic',
}));
