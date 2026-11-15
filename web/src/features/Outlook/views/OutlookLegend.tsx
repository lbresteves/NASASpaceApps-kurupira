import { ColorBar, Typography } from '@shared/components';
import { COLOR_RAMPS } from '@shared/utils';
import type { TOutlookData } from '../types/IOutlook';
import { DATA_LIMITS_NOTE, getLegendDescription, getLegendNotes, getLegendTitle } from '../utils/outlookLabels';
import { getOutlookScale } from '../utils/outlookScale';
import { LegendBox } from './styles/OutlookLegend.styled';

export interface IOutlookLegendProps {
  data: TOutlookData | null;
  hasError: boolean;
}

export const OutlookLegend = ({ data, hasError }: IOutlookLegendProps) => {
  if (hasError) {
    return (
      <LegendBox>
        <Typography variant="caption" color="error">
          Could not load this map data. Try another month.
        </Typography>
      </LegendBox>
    );
  }
  if (!data) return null;

  const scale = getOutlookScale(data);

  return (
    <LegendBox aria-live="polite">
      <ColorBar
        title={getLegendTitle(data)}
        colors={COLOR_RAMPS[scale.ramp]}
        breaks={scale.breaks}
        description={getLegendDescription(scale.breaks, scale.ramp === 'anomaly')}
      />
      {getLegendNotes(data).map((note) => (
        <Typography key={note} variant="caption" color="textSecondary">
          {note}
        </Typography>
      ))}
      <Typography variant="caption" color="textSecondary">
        {DATA_LIMITS_NOTE}
      </Typography>
    </LegendBox>
  );
};
