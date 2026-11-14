import { Dot, type IStatusDotStyledProps } from './StatusDot.styled';

export interface IStatusDotProps extends Partial<IStatusDotStyledProps> {}

export const StatusDot = ({ color = 'success', size = 8, isBlinking = false }: IStatusDotProps) => {
  return <Dot color={color} size={size} isBlinking={isBlinking} aria-hidden="true" />;
};
