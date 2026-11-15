import {
  ExportButtons,
  FireCalendar,
  FiltersModal,
  FireMap,
  FireMapProvider,
  HotspotTrendChart,
  HotspotWatchCard,
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
import { AppFooter, AppHeader, Fade } from '@shared/components';
import { useFocusOnShow } from '@shared/hooks';
import { useState } from 'react';
import { Overlay, PageContainer } from './HomePage.styled';

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
  const handleWatchAreaSelect = (period: string) => {
    playback.pause();
    mapData.showForecast(period);
  };

  return (
    <FireMapProvider>
      <PageContainer isScrollable={isPanelOpen}>
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
                <HotspotWatchCard onAreaSelect={handleWatchAreaSelect} />
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
            footer={<AppFooter />}
          />
        </Fade>
        {isFiltersOpen && (
          <FiltersModal filters={filters} onApply={applyFilters} onClose={() => setIsFiltersOpen(false)} />
        )}
        {!isPanelOpen && <AppFooter isFixed />}
      </PageContainer>
    </FireMapProvider>
  );
};
