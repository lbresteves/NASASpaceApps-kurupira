import styled from '@emotion/styled';

export const InfoSection = styled.section(({ theme }) => ({
  marginTop: theme.spacing.md,
}));

export const InfoSectionTitle = styled.h3(({ theme }) => ({
  ...theme.typography.body,
  margin: `0 0 ${theme.spacing.xs}px`,
  fontWeight: 700,
  color: theme.colors.primarySoftContrast,
}));

export const InfoParagraph = styled.p(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
  '& strong': { fontWeight: 700 },
}));

export const InfoList = styled.ul(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
  paddingLeft: theme.spacing.md,
  '& li + li': { marginTop: theme.spacing.xs },
}));
