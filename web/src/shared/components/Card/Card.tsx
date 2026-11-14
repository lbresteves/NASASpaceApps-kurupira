import type { HTMLAttributes, PropsWithChildren } from 'react';
import { CardContainer, type ICardStyledProps } from './Card.styled';

export interface ICardProps
  extends PropsWithChildren, Partial<ICardStyledProps>, Omit<HTMLAttributes<HTMLDivElement>, 'color'> {}

// <Card color="primary" padding="lg"> — text color follows the background automatically.
export const Card = ({ color = 'surface', padding = 'lg', radius = 'lg', children, ...props }: ICardProps) => {
  return (
    <CardContainer color={color} padding={padding} radius={radius} {...props}>
      {children}
    </CardContainer>
  );
};
