import { SegmentedControl, Typography, WarningIcon } from '@shared/components';
import { getPeriodLabel } from '@shared/utils';
import { useId, useState } from 'react';
import { useFlyToArea } from '../hooks/useFlyToArea';
import { useHotspotWatch } from '../hooks/useHotspotWatch';
import type { IWatchArea } from '../types/IHotspotWatch';
import { WATCH_BASE_YEARS } from '../utils/constants';
import { formatPct, getAreaName } from '../utils/watchLabels';
import {
  ChevronIcon,
  WatchAreaButton,
  WatchBarFill,
  WatchBarTrack,
  WatchBody,
  WatchCard,
  WatchHeading,
  WatchList,
  WatchTitle,
  WatchToggle,
} from './styles/HotspotWatchCard.styled';

export interface IHotspotWatchCardProps {
  /** Called with the card's forecast month when an area is clicked, e.g. to show that forecast on the map. */
  onAreaSelect?: (period: string) => void;
}

export const HotspotWatchCard = ({ onAreaSelect }: IHotspotWatchCardProps) => {
  const { months, period, setPeriod, selectedMonth, hasError } = useHotspotWatch();
  const flyToArea = useFlyToArea();
  const handleAreaClick = (area: IWatchArea) => {
    if (period) onAreaSelect?.(period);
    flyToArea(area);
  };
  const [isExpanded, setIsExpanded] = useState(true);
  const bodyId = useId();
  const periodOptions = months.map((month) => ({ value: month.period, label: getPeriodLabel(month.period) }));

  if (hasError) return null;

  return (
    <WatchCard aria-label="Hotspot watch">
      <WatchHeading>
        <WatchToggle
          type="button"
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          title={isExpanded ? 'Minimize' : 'Expand'}
          onClick={() => setIsExpanded((current) => !current)}>
          <WarningIcon />
          <WatchTitle>Hotspot watch: top 5 areas</WatchTitle>
          <ChevronIcon isExpanded={isExpanded} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </ChevronIcon>
        </WatchToggle>
      </WatchHeading>
      <WatchBody id={bodyId} hidden={!isExpanded}>
        {period && periodOptions.length > 1 && (
          <SegmentedControl label="Forecast month" options={periodOptions} value={period} onChange={setPeriod} />
        )}
        {selectedMonth ? (
          <WatchList>
            {selectedMonth.areas.map((area) => {
              const name = getAreaName(area);
              const pct = formatPct(area.detection_pct);
              return (
                <li key={area.state_code}>
                  <WatchAreaButton
                    onClick={() => handleAreaClick(area)}
                    aria-label={`${name}: ${pct}. Show its forecast on the map`}>
                    <span>{name}</span>
                    <strong>{pct}</strong>
                    <WatchBarTrack aria-hidden="true">
                      <WatchBarFill style={{ width: pct }} />
                    </WatchBarTrack>
                  </WatchAreaButton>
                </li>
              );
            })}
          </WatchList>
        ) : (
          <Typography variant="caption" color="textSecondary">
            Loading…
          </Typography>
        )}
        <Typography variant="caption" color="textSecondary">
          % = share of past years ({WATCH_BASE_YEARS}) with a hotspot on the same day, in a ~28 km area. A historical
          pattern, not a fire forecast.
        </Typography>
      </WatchBody>
    </WatchCard>
  );
};
