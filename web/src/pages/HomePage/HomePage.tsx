import { FireMap, FireMapProvider, MapNorthArrow, MapScaleBar, MapZoomControls, Panel, WelcomeCard } from '@features';
import { Fade, Typography } from '@shared/components';
import { useFocusOnShow } from '@shared/hooks';
import { useState } from 'react';
import { Footer, Overlay, PageContainer } from './HomePage.styled';

export const HomePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelButtonRef = useFocusOnShow<HTMLButtonElement>(!isPanelOpen);
  const mapViewButtonRef = useFocusOnShow<HTMLButtonElement>(isPanelOpen);

  return (
    <FireMapProvider>
      <PageContainer>
        <FireMap shouldHideZoomControls={isPanelOpen} />
        <Overlay>
          <Fade isVisible={!isPanelOpen}>
            <WelcomeCard onOpenPanel={() => setIsPanelOpen(true)} panelButtonRef={panelButtonRef} />
          </Fade>
        </Overlay>
        <Fade isVisible={isPanelOpen}>
          <Panel
            onMapView={() => setIsPanelOpen(false)}
            mapViewButtonRef={mapViewButtonRef}
            topRight={<MapZoomControls />}
            bottomRight={<MapNorthArrow />}
            bottomCenter={<MapScaleBar />}
          />
        </Fade>
        <Footer>
          <Typography variant="caption" color="textSecondary">
            NASA Space Apps Challenge 2026 · Cuiabá, Brazil
          </Typography>
        </Footer>
      </PageContainer>
    </FireMapProvider>
  );
};
