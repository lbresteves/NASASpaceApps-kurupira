import { useEffect, useRef } from 'react';
import { CheckboxInput, CheckboxLabel } from './Checkbox.styled';

export interface ICheckboxProps {
  label: string;
  isChecked: boolean;
  isIndeterminate?: boolean;
  onChange: (isChecked: boolean) => void;
}

export const Checkbox = ({ label, isChecked, isIndeterminate = false, onChange }: ICheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <CheckboxLabel>
      <CheckboxInput
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </CheckboxLabel>
  );
};
