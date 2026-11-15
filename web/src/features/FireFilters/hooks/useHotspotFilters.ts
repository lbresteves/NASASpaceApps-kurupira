import type { IHotspotFilters } from '@shared/types';
import { BRAZIL, DATA_YEARS, MONTH_NUMBERS } from '@shared/utils';
import { useState } from 'react';

export const DEFAULT_HOTSPOT_FILTERS: IHotspotFilters = {
  countryIso: BRAZIL.iso,
  stateCode: null,
  years: DATA_YEARS,
  months: MONTH_NUMBERS,
  isModisSelected: true,
  isViirsSelected: true,
};

export const useHotspotFilters = () => {
  const [filters, setFilters] = useState<IHotspotFilters>(DEFAULT_HOTSPOT_FILTERS);
  return { filters, applyFilters: setFilters };
};
