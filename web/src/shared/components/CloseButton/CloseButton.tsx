import type { ComponentPropsWithRef } from 'react';
import { CloseButtonStyled, type ICloseButtonStyledProps } from './CloseButton.styled';

export interface ICloseButtonProps
  extends Partial<ICloseButtonStyledProps>, Omit<ComponentPropsWithRef<'button'>, 'children' | 'type'> {
  label: string;
}

export const CloseButton = ({ label, size = 'md', ...props }: ICloseButtonProps) => {
  return (
    <CloseButtonStyled type="button" size={size} aria-label={label} {...props}>
      ×
    </CloseButtonStyled>
  );
};
