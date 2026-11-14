import { Checkbox } from '@shared/components';
import { Fieldset, FieldsetTitle, OptionsGrid } from './styles/FiltersModal.styled';

export interface IFilterOption {
  value: number;
  label: string;
}

export interface IFilterCheckboxGroupProps {
  title: string;
  options: IFilterOption[];
  selected: number[];
  onToggle: (value: number, isChecked: boolean) => void;
  onToggleAll: (isChecked: boolean) => void;
}

export const FilterCheckboxGroup = ({ title, options, selected, onToggle, onToggleAll }: IFilterCheckboxGroupProps) => {
  const hasAll = selected.length === options.length;
  const hasSome = selected.length > 0 && !hasAll;

  return (
    <Fieldset>
      <FieldsetTitle>{title}</FieldsetTitle>
      <Checkbox label="All" isChecked={hasAll} isIndeterminate={hasSome} onChange={onToggleAll} />
      <OptionsGrid>
        {options.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            isChecked={selected.includes(value)}
            onChange={(isChecked) => onToggle(value, isChecked)}
          />
        ))}
      </OptionsGrid>
    </Fieldset>
  );
};
