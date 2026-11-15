import { SelectField, SelectInput, SelectLabel } from './Select.styled';

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  label: string;
  value: string;
  options: ISelectOption[];
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

export const Select = ({ label, value, options, onChange, isDisabled = false }: ISelectProps) => {
  return (
    <SelectField>
      <SelectLabel>{label}</SelectLabel>
      <SelectInput value={value} disabled={isDisabled} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </SelectField>
  );
};
