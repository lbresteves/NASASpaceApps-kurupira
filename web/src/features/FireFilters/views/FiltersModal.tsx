import { Button, Checkbox, Modal, Typography } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import { DATA_YEARS, MONTH_NUMBERS } from '@shared/utils';
import { useFiltersDraft } from '../hooks/useFiltersDraft';
import { MONTH_OPTIONS, YEAR_OPTIONS } from '../utils/filterOptions';
import { FilterCheckboxGroup } from './FilterCheckboxGroup';
import { Fieldset, FieldsetTitle, FiltersBody, FooterMessage } from './styles/FiltersModal.styled';

export interface IFiltersModalProps {
  filters: IHotspotFilters;
  onApply: (filters: IHotspotFilters) => void;
  onClose: () => void;
}

export const FiltersModal = ({ filters, onApply, onClose }: IFiltersModalProps) => {
  const { draft, togglePeriod, setPeriod, setSensor, canSave } = useFiltersDraft(filters);

  const save = () => {
    onApply(draft);
    onClose();
  };

  return (
    <Modal
      isOpen
      title="Filters"
      onClose={onClose}
      footer={
        <>
          <FooterMessage>
            {!canSave && (
              <Typography variant="caption" color="warning">
                Pick at least one year, one month and one sensor.
              </Typography>
            )}
          </FooterMessage>
          <Button color="surface" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} disabled={!canSave}>
            Save
          </Button>
        </>
      }>
      <FiltersBody>
        <FilterCheckboxGroup
          title="Years"
          options={YEAR_OPTIONS}
          selected={draft.years}
          onToggle={(year, isChecked) => togglePeriod('years', year, isChecked)}
          onToggleAll={(isChecked) => setPeriod('years', isChecked ? DATA_YEARS : [])}
        />
        <FilterCheckboxGroup
          title="Months"
          options={MONTH_OPTIONS}
          selected={draft.months}
          onToggle={(month, isChecked) => togglePeriod('months', month, isChecked)}
          onToggleAll={(isChecked) => setPeriod('months', isChecked ? MONTH_NUMBERS : [])}
        />
        <Fieldset>
          <FieldsetTitle>Sensors</FieldsetTitle>
          <Checkbox
            label="MODIS (Terra / Aqua)"
            isChecked={draft.isModisSelected}
            onChange={(isChecked) => setSensor('isModisSelected', isChecked)}
          />
          <Checkbox
            label="VIIRS (S-NPP)"
            isChecked={draft.isViirsSelected}
            onChange={(isChecked) => setSensor('isViirsSelected', isChecked)}
          />
          <Typography variant="caption" color="textSecondary">
            With both selected, the calendar and the map show harmonized counts (MODIS-equivalent), never raw MODIS +
            VIIRS sums.
          </Typography>
        </Fieldset>
      </FiltersBody>
    </Modal>
  );
};
