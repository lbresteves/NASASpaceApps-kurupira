import { getStateName } from '@shared/utils';
import type { IWatchArea } from '../types/IHotspotWatch';

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const getAreaName = ({ state_code, position }: IWatchArea) =>
  `${capitalize(position)} ${getStateName(state_code) ?? `state ${state_code}`}`;

export const formatPct = (pct: number) => `${Math.round(pct)}%`;
