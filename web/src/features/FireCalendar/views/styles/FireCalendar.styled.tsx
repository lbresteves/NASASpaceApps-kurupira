import styled from '@emotion/styled';
import { omitProps } from '@shared/utils';

export const CalendarContainer = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  height: '100%',
  minHeight: 0,
}));

export const CalendarHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.md,
}));

export const CalendarScroll = styled.div(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
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
  backgroundColor: theme.colors.background,
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
