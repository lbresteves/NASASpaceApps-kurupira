import { CloseButton, Typography } from '@shared/components';
import type { ICalendarSelection, IHotspotFilters, IRegion } from '@shared/types';
import { describePeriod } from '@shared/utils';
import { useRegionSummary } from '../hooks/useRegionSummary';
import { getRegionArea, getRegionContext } from '../utils/regionArea';
import { buildSummaryRows } from '../utils/summaryRows';
import { RegionHeading, SummaryBox, SummaryList, SummaryTitle } from './styles/RegionSummaryCard.styled';

export interface IRegionSummaryCardProps {
  region: IRegion | null;
  filters: IHotspotFilters;
  selection: ICalendarSelection | null;
  onClear: () => void;
}

export const RegionSummaryCard = ({ region, filters, selection, onClear }: IRegionSummaryCardProps) => {
  const hasData = region !== null && region.kind !== 'country';
  const { summary, hasError } = useRegionSummary(filters, selection, hasData);
  const area = getRegionArea(region, summary);
  const rows = area && summary ? buildSummaryRows(area, summary.brazil, filters) : [];
  const context = getRegionContext(region, summary);

  return (
    <SummaryBox aria-label="Region summary" aria-live="polite">
      {region ? (
        <RegionHeading>
          <div>
            <SummaryTitle>{region.name}</SummaryTitle>
            <Typography variant="caption" color="textSecondary">
              {[context, describePeriod(filters, selection)].filter(Boolean).join(' · ')}
            </Typography>
          </div>
          <CloseButton size="sm" label={`Clear ${region.name}`} onClick={onClear} />
        </RegionHeading>
      ) : (
        <Typography variant="caption" color="textSecondary">
          Click a state on the map to see its summary. Zoom out to select all of Brazil.
        </Typography>
      )}

      {rows.length > 0 && (
        <SummaryList>
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </SummaryList>
      )}

      {hasData && !area && !hasError && (
        <Typography variant="caption" color="textSecondary">
          Loading…
        </Typography>
      )}
      {region?.kind === 'country' && (
        <Typography variant="caption" color="textSecondary">
          No data yet: Kurupira only has data for Brazil so far.
        </Typography>
      )}
      {hasError && (
        <Typography variant="caption" color="error">
          Could not load the region summary.
        </Typography>
      )}
    </SummaryBox>
  );
};
