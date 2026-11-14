import type { ReactNode } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { ChipBox, ChipButton, type IChipStyledProps } from './Chip.styled';

export interface IChipProps extends Partial<IChipStyledProps> {
  label: string;
  tooltip?: ReactNode;
  onClick?: () => void;
}

export const Chip = ({ color = 'surface', height = 16, isSelected = false, label, tooltip, onClick }: IChipProps) => {
  const styleProps = { color, height, isSelected };

  const chip = onClick ? (
    <ChipButton type="button" {...styleProps} aria-label={label} aria-pressed={isSelected} onClick={onClick} />
  ) : (
    <ChipBox {...styleProps} role="img" aria-label={label} tabIndex={tooltip ? 0 : undefined} />
  );

  return tooltip ? <Tooltip content={tooltip}>{chip}</Tooltip> : chip;
};
