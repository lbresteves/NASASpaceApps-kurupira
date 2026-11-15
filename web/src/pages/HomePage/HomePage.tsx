import {
  FireCalendar,
  FiltersModal,
  FireMap,
  FireMapProvider,
  MapColorModeToggle,
  MapHotspots,
  MapHotspotsLegend,
  MapNorthArrow,
  MapRegions,
  MapScaleBar,
  MapZoomControls,
  Panel,
  RegionSummaryCard,
  type TMapColorMode,
  useCalendarSelection,
  useHotspotFilters,
  useRegionSelection,
  WelcomeCard,
} from '@features';
import { Fade, Typography } from '@shared/components';
import { useFocusOnShow } from '@shared/hooks';
import { useState } from 'react';
import { Footer, Overlay, PageContainer } from './HomePage.styled';

export const HomePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mapColorMode, setMapColorMode] = useState<TMapColorMode>('harmonized');
  const panelButtonRef = useFocusOnShow<HTMLButtonElement>(!isPanelOpen);
  const mapViewButtonRef = useFocusOnShow<HTMLButtonElement>(isPanelOpen);
  const { filters, applyFilters } = useHotspotFilters();
  const { selection, toggleMonth, toggleYear } = useCalendarSelection(filters);
  const { selectedRegion, toggleRegion, clearRegion } = useRegionSelection();

  return (
    <FireMapProvider>
      <PageContainer>
        <FireMap shouldHideZoomControls={isPanelOpen} />
        <MapHotspots filters={filters} selection={selection} mode={mapColorMode} />
        <MapRegions selectedRegion={selectedRegion} isEnabled={isPanelOpen} onRegionClick={toggleRegion} />
        <Overlay>
          <Fade isVisible={!isPanelOpen}>
            <WelcomeCard onOpenPanel={() => setIsPanelOpen(true)} panelButtonRef={panelButtonRef} />
          </Fade>
        </Overlay>
        <Fade isVisible={isPanelOpen}>
          <Panel
            onMapView={() => setIsPanelOpen(false)}
            mapViewButtonRef={mapViewButtonRef}
            topLeft={<MapColorModeToggle filters={filters} mode={mapColorMode} onChange={setMapColorMode} />}
            topRight={<MapZoomControls />}
            bottomLeft={<MapHotspotsLegend filters={filters} mode={mapColorMode} />}
            bottomRight={<MapNorthArrow />}
            bottomCenter={<MapScaleBar />}
            side={
              <RegionSummaryCard
                region={selectedRegion}
                filters={filters}
                selection={selection}
                onClear={clearRegion}
              />
            }
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
