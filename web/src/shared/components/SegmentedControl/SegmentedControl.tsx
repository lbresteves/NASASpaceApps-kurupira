import { SegmentButton, SegmentGroup } from './SegmentedControl.styled';

export interface ISegmentOption<T extends string> {
  value: T;
  label: string;
}

export interface ISegmentedControlProps<T extends string> {
  label: string;
  options: ISegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({ label, options, value, onChange }: ISegmentedControlProps<T>) => {
  return (
    <SegmentGroup role="group" aria-label={label}>
      {options.map((option) => (
        <SegmentButton
          key={option.value}
          type="button"
          isActive={option.value === value}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}>
          {option.label}
        </SegmentButton>
      ))}
    </SegmentGroup>
  );
};
