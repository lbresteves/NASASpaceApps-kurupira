import { InfoList, InfoParagraph, InfoSection, InfoSectionTitle } from '@shared/components';
import { BASELINE_LABEL } from '../utils/constants';

export const MapDataInfo = () => {
  return (
    <>
      <InfoParagraph>
        The map has three views. All counts are harmonized hotspots (MODIS-equivalent) per ~28 km cell.
      </InfoParagraph>

      <InfoSection>
        <InfoSectionTitle>NASA hotspots</InfoSectionTitle>
        <InfoParagraph>
          What the satellites actually detected, for the years and months you pick in the filters and the calendar.
        </InfoParagraph>
      </InfoSection>

      <InfoSection>
        <InfoSectionTitle>Forecast (Dec 2026 – Jan 2027)</InfoSectionTitle>
        <InfoList>
          <li>
            <strong>On the map:</strong> each cell shows how many hotspots it had, on average, on the same calendar days
            in {BASELINE_LABEL}. It is a historical pattern (an analog), not a fire probability.
          </li>
          <li>
            <strong>For Brazil as a whole:</strong> a machine-learning model (Random Forest) estimates the national
            total per day and the chance of a high-activity day. That chance is for the whole country, not for a single
            place.
          </li>
          <li>No weather data goes in, so a very dry or very rainy season can change the picture.</li>
        </InfoList>
      </InfoSection>

      <InfoSection>
        <InfoSectionTitle>Dec–Jan vs average</InfoSectionTitle>
        <InfoList>
          <li>
            Compares each past December or January ({BASELINE_LABEL}) with that cell&apos;s average for the same month.
          </li>
          <li>
            <strong>Orange:</strong> more hotspots than usual. <strong>Blue:</strong> fewer. <strong>Gray:</strong>{' '}
            close to the average.
          </li>
          <li>Years with no detections count as zero, so the average isn&apos;t pulled up by busy years only.</li>
        </InfoList>
      </InfoSection>
    </>
  );
};
