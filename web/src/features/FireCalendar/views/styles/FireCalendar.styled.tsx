import styled from '@emotion/styled';

export const CalendarContainer = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
  height: '100%',
  minHeight: 0,
}));

export const CalendarScroll = styled.div(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: theme.spacing.xs,
}));

export const CalendarGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'max-content repeat(12, minmax(12px, 1fr))',
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

export const YearCell = styled.div(({ theme }) => ({
  paddingRight: theme.spacing.sm,
}));
