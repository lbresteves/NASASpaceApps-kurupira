import { InfoList, InfoParagraph, InfoSection, InfoSectionTitle } from '@shared/components';

export const SensorInfo = () => {
  return (
    <>
      <InfoParagraph>
        Kurupira maps <strong>hotspots</strong>: places where a satellite sensed unusual heat. Most are fires, but not
        all, and a fire hidden by clouds or thick smoke may not be seen.
      </InfoParagraph>

      <InfoSection>
        <InfoSectionTitle>MODIS</InfoSectionTitle>
        <InfoList>
          <li>On NASA&apos;s Terra (since 2000) and Aqua (since 2002) satellites.</li>
          <li>Each detection covers about 1 km × 1 km.</li>
          <li>More than 20 years of history, but both satellites are near the end of their missions.</li>
        </InfoList>
      </InfoSection>

      <InfoSection>
        <InfoSectionTitle>VIIRS</InfoSectionTitle>
        <InfoList>
          <li>On Suomi NPP (since 2012), NOAA-20 and NOAA-21.</li>
          <li>Each detection covers about 375 m × 375 m, so it catches smaller fires.</li>
          <li>The successor that keeps the fire record going after MODIS.</li>
        </InfoList>
      </InfoSection>

      <InfoSection>
        <InfoSectionTitle>Why harmonize them?</InfoSectionTitle>
        <InfoParagraph>
          VIIRS sees more and smaller fires, so its raw counts are higher and can&apos;t be added to MODIS counts.
          Kurupira converts both into one MODIS-equivalent series, so the years before and after VIIRS can be compared
          fairly. Data: NASA FIRMS.
        </InfoParagraph>
      </InfoSection>
    </>
  );
};
