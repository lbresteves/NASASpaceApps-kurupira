import styled from '@emotion/styled';

/** A borderless surface card for panel sections (chart, region summary, hotspot watch). Extend it with `styled()`. */
export const SectionCardStyled = styled.section(({ theme }) => ({
  pointerEvents: 'auto',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  padding: theme.spacing.md,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radius.lg,
  color: theme.colors.textPrimary,
}));
