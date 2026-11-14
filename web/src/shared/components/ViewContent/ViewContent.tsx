import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { ICommonStyledProps } from '@shared/types';
import { ViewContentStyled } from './ViewContent.styled';

export interface IViewContentProps extends PropsWithChildren, ICommonStyledProps, HTMLAttributes<HTMLDivElement> {}

// Flex container with layout shortcuts: <ViewContent center flexRow gap="md" pad={12} bg="surface">.
// Like a React Native View: column by default and flex: 1 (use `fit` to size to content).
export const ViewContent = ({ children, ...props }: IViewContentProps) => {
  return <ViewContentStyled {...props}>{children}</ViewContentStyled>;
};
