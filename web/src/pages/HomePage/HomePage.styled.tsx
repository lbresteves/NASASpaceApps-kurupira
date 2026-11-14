import styled from '@emotion/styled';

export const PageContainer = styled.main(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.lg,
  padding: theme.spacing.md,
}));
