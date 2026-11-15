import { useId } from 'react';
import {
  RangeEnds,
  RangeField,
  RangeFill,
  RangeHeader,
  RangeInput,
  RangeLabel,
  RangeTrack,
  RangeValue,
} from './RangeSlider.styled';

export type TRange = [number, number];

export interface IRangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: TRange;
  onChange: (value: TRange) => void;
}

const toPercent = (value: number, min: number, max: number) => (max === min ? 0 : ((value - min) / (max - min)) * 100);

export const RangeSlider = ({ label, min, max, value, onChange }: IRangeSliderProps) => {
  const labelId = useId();
  const [from, to] = value;

  return (
    <RangeField role="group" aria-labelledby={labelId}>
      <RangeHeader>
        <RangeLabel id={labelId}>{label}</RangeLabel>
        <RangeValue>{from === to ? from : `${from} – ${to}`}</RangeValue>
      </RangeHeader>
      <RangeTrack>
        <RangeFill startPercent={toPercent(from, min, max)} endPercent={toPercent(to, min, max)} />
        <RangeInput
          type="range"
          min={min}
          max={max}
          value={from}
          aria-label={`${label}: from`}
          isOnTop={from === max}
          onChange={(event) => onChange([Math.min(Number(event.target.value), to), to])}
        />
        <RangeInput
          type="range"
          min={min}
          max={max}
          value={to}
          aria-label={`${label}: to`}
          isOnTop={false}
          onChange={(event) => onChange([from, Math.max(Number(event.target.value), from)])}
        />
      </RangeTrack>
      <RangeEnds aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </RangeEnds>
    </RangeField>
  );
};
