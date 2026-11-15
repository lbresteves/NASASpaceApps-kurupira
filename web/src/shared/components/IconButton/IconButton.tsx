import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { IconButtonStyled } from './IconButton.styled';

export interface IIconButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'type'> {
  label: string;
  icon: ReactNode;
}

export const IconButton = ({ label, icon, ...props }: IIconButtonProps) => {
  return (
    <Tooltip content={label}>
      <IconButtonStyled type="button" aria-label={label} {...props}>
        {icon}
      </IconButtonStyled>
    </Tooltip>
  );
};
