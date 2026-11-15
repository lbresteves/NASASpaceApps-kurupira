import styled from '@emotion/styled';

export const SummaryBox = styled.section(({ theme }) => ({
  pointerEvents: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  color: theme.colors.textPrimary,
  [theme.media.mobile]: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
  },
}));

export const RegionHeading = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing.sm,
}));

export const SummaryTitle = styled.h2(({ theme }) => ({
  ...theme.typography.body,
  margin: 0,
  fontWeight: 700,
}));

export const SummaryList = styled.dl(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
  fontVariantNumeric: 'tabular-nums',
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    padding: `${theme.spacing.xs}px 0`,
    borderTop: `1px solid ${theme.colors.border}`,
  },
  '& dt': { color: theme.colors.textSecondary },
  '& dd': { margin: 0, whiteSpace: 'nowrap' },
}));
