import styled from '@emotion/styled';
import type { TColorName, TTypographyVariant } from '@shared/theme';
import { omitProps } from '@shared/utils';

export interface ITypographyStyledProps {
  variant: TTypographyVariant;
  color?: TColorName;
  isBold?: boolean;
  isCentered?: boolean;
}

export const variantTags: Record<TTypographyVariant, 'h1' | 'h2' | 'p' | 'span'> = {
  title: 'h1',
  subtitle: 'h2',
  body: 'p',
  caption: 'span',
};

export const TypographyStyled = styled('p', {
  shouldForwardProp: omitProps('variant', 'color', 'isBold', 'isCentered'),
})<ITypographyStyledProps>(({ theme, variant, color, isBold, isCentered }) => ({
  ...theme.typography[variant],
  margin: 0,
  color: color ? theme.colors[color] : 'inherit',
  ...(isBold && { fontWeight: 700 }),
  ...(isCentered && { textAlign: 'center' }),
}));
