import styled from '@emotion/styled';
import { SectionCard } from '@shared/components';
import { omitProps } from '@shared/utils';

export const CalendarContainer = styled(SectionCard)(({ theme }) => ({
  gap: theme.spacing.xs,
}));

export const CalendarHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
}));

export const HeaderActions = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: theme.spacing.sm,
}));

export const CalendarScroll = styled.div(({ theme }) => ({
  padding: theme.spacing.xs,
}));

export const CalendarGrid = styled('div', {
  shouldForwardProp: omitProps('monthCount'),
})<{ monthCount: number }>(({ theme, monthCount }) => ({
  display: 'grid',
  gridTemplateColumns: `max-content repeat(${monthCount}, minmax(12px, 1fr))`,
  alignItems: 'center',
  columnGap: theme.spacing.xs,
  rowGap: theme.spacing.xs,
}));

export const HeaderCell = styled.div(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  paddingBottom: theme.spacing.xs,
  backgroundColor: theme.colors.surface,
  textAlign: 'center',
  '&:first-of-type': { textAlign: 'left' },
}));

const YEAR_HOVER_SCALE = 1.15;

export const YearButton = styled('button', {
  shouldForwardProp: omitProps('isSelected'),
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  ...theme.typography.caption,
  justifySelf: 'start',
  marginRight: theme.spacing.xs,
  padding: `0 ${theme.spacing.xs}px`,
  border: 'none',
  borderRadius: theme.radius.sm,
  backgroundColor: isSelected ? theme.colors.textPrimary : 'transparent',
  color: isSelected ? theme.colors.background : theme.colors.textPrimary,
  fontFamily: 'inherit',
  fontWeight: isSelected ? 700 : 400,
  cursor: 'pointer',
  transformOrigin: 'left center',
  transition: 'transform 150ms ease-out, background-color 150ms ease',
  '&:hover': { transform: `scale(${YEAR_HOVER_SCALE})` },
  '&:focus-visible': { outline: `2px solid ${theme.colors.textPrimary}`, outlineOffset: 2 },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));

export const YearLabel = styled.span(({ theme }) => ({
  ...theme.typography.caption,
  marginRight: theme.spacing.xs,
  padding: `0 ${theme.spacing.xs}px`,
  color: theme.colors.textPrimary,
}));
