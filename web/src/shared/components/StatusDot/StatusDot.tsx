import { Dot, type IStatusDotStyledProps } from './StatusDot.styled';

export interface IStatusDotProps extends Partial<IStatusDotStyledProps> {}

// Small colored dot for statuses: <StatusDot color="success" isBlinking />.
// Decorative only (aria-hidden): always pair it with text that says the status.
export const StatusDot = ({ color = 'success', size = 8, isBlinking = false }: IStatusDotProps) => {
  return <Dot color={color} size={size} isBlinking={isBlinking} aria-hidden="true" />;
};
