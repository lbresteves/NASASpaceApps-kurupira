import {
  ExportButtons,
  FireCalendar,
  FiltersModal,
  FireMap,
  FireMapProvider,
  HotspotTrendChart,
  MapColorModeToggle,
  MapDataControl,
  MapHotspots,
  MapHotspotsLegend,
  MapNorthArrow,
  MapOutlook,
  MapRegions,
  MapScaleBar,
  MapZoomControls,
  OutlookCalendar,
  OutlookLegend,
  Panel,
  PlaybackControl,
  RegionSummaryCard,
  type TMapColorMode,
  useCalendarSelection,
  useHotspotFilters,
  useMapDataSelection,
  useOutlookData,
  usePlayback,
  useRegionSelection,
  WelcomeCard,
} from '@features';
import { AppHeader, Fade, Typography } from '@shared/components';
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
  const mapData = useMapDataSelection();
  const outlook = useOutlookData(mapData.mode, mapData.period);
  const handleMapDataChange: typeof mapData.setMode = (mode) => {
    playback.pause();
    mapData.setMode(mode);
  };

  return (
    <FireMapProvider>
      <PageContainer>
        <FireMap shouldHideZoomControls={isPanelOpen} />
        <AppHeader />
        <MapHotspots filters={filters} selection={selection} mode={mapColorMode} isHidden={!mapData.isObserved} />
        <MapOutlook data={outlook.data} />
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
            top={<MapDataControl mode={mapData.mode} onModeChange={handleMapDataChange} />}
            topLeft={
              mapData.isObserved && (
                <MapColorModeToggle filters={filters} mode={mapColorMode} onChange={setMapColorMode} />
              )
            }
            topCenter={
              mapData.isObserved && (
                <PlaybackControl
                  isPlaying={playback.isPlaying}
                  canPlay={playback.canPlay}
                  currentStep={playback.currentStep}
                  onPlay={playback.play}
                  onPause={playback.pause}
                />
              )
            }
            topRight={<MapZoomControls />}
            bottomLeft={
              mapData.isObserved ? (
                <MapHotspotsLegend filters={filters} mode={mapColorMode} />
              ) : (
                <OutlookLegend data={outlook.data} hasError={outlook.hasError} />
              )
            }
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
              mapData.mode === 'observed' ? (
                <FireCalendar
                  filters={filters}
                  selection={selection}
                  onMonthClick={handleMonthClick}
                  onYearClick={handleYearClick}
                  onOpenFilters={() => setIsFiltersOpen(true)}
                  headerActions={<ExportButtons filters={filters} />}
                />
              ) : (
                <OutlookCalendar mode={mapData.mode} period={mapData.period} onPeriodChange={mapData.setPeriod} />
              )
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
