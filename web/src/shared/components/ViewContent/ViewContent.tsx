import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { ICommonStyledProps } from '@shared/types';
import { ViewContentStyled } from './ViewContent.styled';

export interface IViewContentProps extends PropsWithChildren, ICommonStyledProps, HTMLAttributes<HTMLDivElement> {}

export const ViewContent = ({ children, ...props }: IViewContentProps) => {
  return <ViewContentStyled {...props}>{children}</ViewContentStyled>;
};
