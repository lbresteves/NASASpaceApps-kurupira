import type { ComponentPropsWithRef } from 'react';
import { ButtonStyled, type IButtonStyledProps } from './Button.styled';

export interface IButtonProps extends Partial<IButtonStyledProps>, Omit<ComponentPropsWithRef<'button'>, 'color'> {}

export const Button = ({ color = 'primary', type = 'button', children, ...props }: IButtonProps) => {
  return (
    <ButtonStyled color={color} type={type} {...props}>
      {children}
    </ButtonStyled>
  );
};
