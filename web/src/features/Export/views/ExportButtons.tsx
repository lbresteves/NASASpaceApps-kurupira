import { FileIcon, IconButton, Typography } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import { buildHotspotSearch } from '@shared/utils';
import { usePdfExport } from '../hooks/usePdfExport';
import { buildCsvUrl } from '../services/exportService';
import { ExportGroup } from './styles/ExportButtons.styled';

export interface IExportButtonsProps {
  filters: IHotspotFilters;
}

export const ExportButtons = ({ filters }: IExportButtonsProps) => {
  const search = buildHotspotSearch(filters);
  const { exportPdf, isExporting, hasError, canExport } = usePdfExport(filters);

  return (
    <ExportGroup role="group" aria-label="Export">
      {hasError && (
        <Typography variant="caption" color="error" role="alert">
          Could not open the report. Allow pop-ups and try again.
        </Typography>
      )}
      <IconButton
        label="Download CSV"
        icon={<FileIcon extension="CSV" />}
        disabled={!search}
        onClick={() => search && window.location.assign(buildCsvUrl(search))}
      />
      <IconButton
        label={isExporting ? 'Preparing PDF…' : 'Download PDF report'}
        icon={<FileIcon extension="PDF" />}
        disabled={!canExport || isExporting}
        onClick={exportPdf}
      />
    </ExportGroup>
  );
};
