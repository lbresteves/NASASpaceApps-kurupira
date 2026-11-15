import styled from '@emotion/styled';

export const FiltersBody = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

export const Fieldset = styled.fieldset(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  margin: 0,
  padding: 0,
  border: 'none',
  minWidth: 0,
}));

export const FieldsetTitle = styled.legend(({ theme }) => ({
  ...theme.typography.body,
  fontWeight: 600,
  padding: 0,
  marginBottom: theme.spacing.sm,
}));

export const OptionsGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
  gap: theme.spacing.sm,
}));

export const AreaRow = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing.md,
  [theme.media.mobile]: { gridTemplateColumns: '1fr' },
}));

export const FooterMessage = styled.div({
  flex: 1,
});
