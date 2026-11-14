import type { HTMLAttributes, PropsWithChildren } from 'react';
import { type ITypographyStyledProps, TypographyStyled, variantTags } from './Typography.styled';

export interface ITypographyProps
  extends PropsWithChildren, Partial<ITypographyStyledProps>, Omit<HTMLAttributes<HTMLElement>, 'color'> {}

// <Typography variant="title" color="primary">. Without color, it inherits from its parent.
export const Typography = ({ variant = 'body', children, ...props }: ITypographyProps) => {
  return (
    <TypographyStyled as={variantTags[variant]} variant={variant} {...props}>
      {children}
    </TypographyStyled>
  );
};
