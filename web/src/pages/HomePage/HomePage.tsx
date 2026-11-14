import {
  FireCalendar,
  FiltersModal,
  FireMap,
  FireMapProvider,
  MapHotspots,
  MapHotspotsLegend,
  MapNorthArrow,
  MapScaleBar,
  MapZoomControls,
  Panel,
  useCalendarSelection,
  useHotspotFilters,
  WelcomeCard,
} from '@features';
import { Fade, Typography } from '@shared/components';
import { useFocusOnShow } from '@shared/hooks';
import { useState } from 'react';
import { Footer, Overlay, PageContainer } from './HomePage.styled';

export const HomePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const panelButtonRef = useFocusOnShow<HTMLButtonElement>(!isPanelOpen);
  const mapViewButtonRef = useFocusOnShow<HTMLButtonElement>(isPanelOpen);
  const { filters, applyFilters } = useHotspotFilters();
  const { selection, toggleMonth, toggleYear } = useCalendarSelection(filters);

  return (
    <FireMapProvider>
      <PageContainer>
        <FireMap shouldHideZoomControls={isPanelOpen} />
        <MapHotspots filters={filters} selection={selection} />
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
            bottomLeft={<MapHotspotsLegend />}
            bottomRight={<MapNorthArrow />}
            bottomCenter={<MapScaleBar />}
            below={
              <FireCalendar
                filters={filters}
                selection={selection}
                onMonthClick={toggleMonth}
                onYearClick={toggleYear}
                onOpenFilters={() => setIsFiltersOpen(true)}
              />
            }
          />
        </Fade>
        {isFiltersOpen && (
          <FiltersModal filters={filters} onApply={applyFilters} onClose={() => setIsFiltersOpen(false)} />
        )}
        <Footer>
          <Typography variant="caption" color="textSecondary">
            NASA Space Apps Challenge 2026 · Cuiabá, Brazil
          </Typography>
        </Footer>
      </PageContainer>
    </FireMapProvider>
  );
};
