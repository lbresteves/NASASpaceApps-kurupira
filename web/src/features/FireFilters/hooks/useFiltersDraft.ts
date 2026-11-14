import type { IHotspotFilters } from '@shared/types';
import { useState } from 'react';

export type TPeriodKey = 'years' | 'months';
export type TSensorKey = 'isModisSelected' | 'isViirsSelected';

const toggleInList = (list: number[], value: number, isChecked: boolean) =>
  isChecked ? [...new Set([...list, value])] : list.filter((item) => item !== value);

export const useFiltersDraft = (initialFilters: IHotspotFilters) => {
  const [draft, setDraft] = useState(initialFilters);

  const togglePeriod = (key: TPeriodKey, value: number, isChecked: boolean) =>
    setDraft((current) => ({ ...current, [key]: toggleInList(current[key], value, isChecked) }));

  const setPeriod = (key: TPeriodKey, values: number[]) => setDraft((current) => ({ ...current, [key]: values }));

  const setSensor = (key: TSensorKey, isChecked: boolean) => setDraft((current) => ({ ...current, [key]: isChecked }));

  const canSave = draft.years.length > 0 && draft.months.length > 0 && (draft.isModisSelected || draft.isViirsSelected);

  return { draft, togglePeriod, setPeriod, setSensor, canSave };
};
