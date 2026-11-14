import type { IYearMonth } from '@shared/types';
import { useCallback, useState } from 'react';
import { isSameMonth } from '../utils/isSameMonth';

export const useSelectedMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState<IYearMonth | null>(null);

  const toggleMonth = useCallback((month: IYearMonth) => {
    setSelectedMonth((current) => (isSameMonth(current, month) ? null : month));
  }, []);

  return { selectedMonth, toggleMonth };
};
