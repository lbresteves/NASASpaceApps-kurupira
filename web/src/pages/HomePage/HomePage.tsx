import {
  ExportButtons,
  FireCalendar,
  FiltersModal,
  FireMap,
  FireMapProvider,
  HotspotTrendChart,
  MapColorModeToggle,
  MapHotspots,
  MapHotspotsLegend,
  MapNorthArrow,
  MapRegions,
  MapScaleBar,
  MapZoomControls,
  Panel,
  PlaybackControl,
  RegionSummaryCard,
  type TMapColorMode,
  useCalendarSelection,
  useHotspotFilters,
  usePlayback,
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
  const { selection, selectMonth, toggleMonth, toggleYear } = useCalendarSelection(filters);
  const playback = usePlayback(filters, selectMonth);
  const handleMonthClick: typeof toggleMonth = (month) => {
    playback.pause();
    toggleMonth(month);
  };
  const handleYearClick: typeof toggleYear = (year) => {
    playback.pause();
    toggleYear(year);
  };
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
            topCenter={
              <PlaybackControl
                isPlaying={playback.isPlaying}
                canPlay={playback.canPlay}
                currentStep={playback.currentStep}
                onPlay={playback.play}
                onPause={playback.pause}
              />
            }
            topRight={<MapZoomControls />}
            bottomLeft={<MapHotspotsLegend filters={filters} mode={mapColorMode} />}
            bottomRight={<MapNorthArrow />}
            bottomCenter={<MapScaleBar />}
            side={
              <>
                <HotspotTrendChart
                  filters={filters}
                  region={selectedRegion}
                  selection={selection}
                  onPointClick={handleMonthClick}
                />
                <RegionSummaryCard
                  region={selectedRegion}
                  filters={filters}
                  selection={selection}
                  onClear={clearRegion}
                />
              </>
            }
            below={
              <FireCalendar
                filters={filters}
                selection={selection}
                onMonthClick={handleMonthClick}
                onYearClick={handleYearClick}
                onOpenFilters={() => setIsFiltersOpen(true)}
                headerActions={<ExportButtons filters={filters} />}
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
