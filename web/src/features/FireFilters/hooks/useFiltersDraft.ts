import type { TRange } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import { useState } from 'react';
import { buildYearRange } from '../utils/filterOptions';

export type TSensorKey = 'isModisSelected' | 'isViirsSelected';

const toggleInList = (list: number[], value: number, isChecked: boolean) =>
  isChecked ? [...new Set([...list, value])] : list.filter((item) => item !== value);

export const useFiltersDraft = (initialFilters: IHotspotFilters) => {
  const [draft, setDraft] = useState(initialFilters);

  const setCountry = (countryIso: string) => setDraft((current) => ({ ...current, countryIso, stateCode: null }));

  const setStateCode = (stateCode: string | null) => setDraft((current) => ({ ...current, stateCode }));

  const setYearRange = (range: TRange) => setDraft((current) => ({ ...current, years: buildYearRange(range) }));

  const toggleMonth = (month: number, isChecked: boolean) =>
    setDraft((current) => ({ ...current, months: toggleInList(current.months, month, isChecked) }));

  const setMonths = (months: number[]) => setDraft((current) => ({ ...current, months }));

  const setSensor = (key: TSensorKey, isChecked: boolean) => setDraft((current) => ({ ...current, [key]: isChecked }));

  const canSave = draft.years.length > 0 && draft.months.length > 0 && (draft.isModisSelected || draft.isViirsSelected);

  return { draft, setCountry, setStateCode, setYearRange, toggleMonth, setMonths, setSensor, canSave };
};
