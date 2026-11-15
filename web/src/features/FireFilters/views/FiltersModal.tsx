import { Button, Checkbox, Modal, RangeSlider, Select, Typography } from '@shared/components';
import type { IHotspotFilters } from '@shared/types';
import { MONTH_NUMBERS } from '@shared/utils';
import { useFiltersDraft } from '../hooks/useFiltersDraft';
import {
  ALL_STATES_VALUE,
  COUNTRY_OPTIONS,
  FIRST_YEAR,
  getYearRange,
  LAST_YEAR,
  MONTH_OPTIONS,
  STATE_OPTIONS,
} from '../utils/filterOptions';
import { FilterCheckboxGroup } from './FilterCheckboxGroup';
import { AreaRow, Fieldset, FieldsetTitle, FiltersBody, FooterMessage } from './styles/FiltersModal.styled';

export interface IFiltersModalProps {
  filters: IHotspotFilters;
  onApply: (filters: IHotspotFilters) => void;
  onClose: () => void;
}

export const FiltersModal = ({ filters, onApply, onClose }: IFiltersModalProps) => {
  const { draft, setCountry, setStateCode, setYearRange, toggleMonth, setMonths, setSensor, canSave } =
    useFiltersDraft(filters);

  const save = () => {
    onApply(draft);
    onClose();
  };

  return (
    <Modal
      isOpen
      title="Filters"
      isTranslucent
      onClose={onClose}
      footer={
        <>
          <FooterMessage>
            {!canSave && (
              <Typography variant="caption" color="warning">
                Pick at least one month and one sensor.
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
        <Fieldset>
          <AreaRow>
            <Select label="Country" value={draft.countryIso} options={COUNTRY_OPTIONS} onChange={setCountry} />
            <Select
              label="State"
              value={draft.stateCode ?? ALL_STATES_VALUE}
              options={STATE_OPTIONS}
              onChange={(value) => setStateCode(value === ALL_STATES_VALUE ? null : value)}
            />
          </AreaRow>
          <Typography variant="caption" color="textSecondary">
            Only Brazil has data so far.
          </Typography>
        </Fieldset>
        <RangeSlider
          label="Years"
          min={FIRST_YEAR}
          max={LAST_YEAR}
          value={getYearRange(draft.years)}
          onChange={setYearRange}
        />
        <FilterCheckboxGroup
          title="Months"
          options={MONTH_OPTIONS}
          selected={draft.months}
          onToggle={toggleMonth}
          onToggleAll={(isChecked) => setMonths(isChecked ? MONTH_NUMBERS : [])}
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
