import type { IBrazilState, IHotspotFilters } from '@shared/types';

export const BRAZIL = { iso: 'BRA', name: 'Brazil' } as const;

export const BRAZIL_STATES: IBrazilState[] = [
  { code: '12', name: 'Acre', abbreviation: 'AC' },
  { code: '27', name: 'Alagoas', abbreviation: 'AL' },
  { code: '16', name: 'Amapá', abbreviation: 'AP' },
  { code: '13', name: 'Amazonas', abbreviation: 'AM' },
  { code: '29', name: 'Bahia', abbreviation: 'BA' },
  { code: '23', name: 'Ceará', abbreviation: 'CE' },
  { code: '53', name: 'Distrito Federal', abbreviation: 'DF' },
  { code: '32', name: 'Espírito Santo', abbreviation: 'ES' },
  { code: '52', name: 'Goiás', abbreviation: 'GO' },
  { code: '21', name: 'Maranhão', abbreviation: 'MA' },
  { code: '51', name: 'Mato Grosso', abbreviation: 'MT' },
  { code: '50', name: 'Mato Grosso do Sul', abbreviation: 'MS' },
  { code: '31', name: 'Minas Gerais', abbreviation: 'MG' },
  { code: '15', name: 'Pará', abbreviation: 'PA' },
  { code: '25', name: 'Paraíba', abbreviation: 'PB' },
  { code: '41', name: 'Paraná', abbreviation: 'PR' },
  { code: '26', name: 'Pernambuco', abbreviation: 'PE' },
  { code: '22', name: 'Piauí', abbreviation: 'PI' },
  { code: '33', name: 'Rio de Janeiro', abbreviation: 'RJ' },
  { code: '24', name: 'Rio Grande do Norte', abbreviation: 'RN' },
  { code: '43', name: 'Rio Grande do Sul', abbreviation: 'RS' },
  { code: '11', name: 'Rondônia', abbreviation: 'RO' },
  { code: '14', name: 'Roraima', abbreviation: 'RR' },
  { code: '42', name: 'Santa Catarina', abbreviation: 'SC' },
  { code: '35', name: 'São Paulo', abbreviation: 'SP' },
  { code: '28', name: 'Sergipe', abbreviation: 'SE' },
  { code: '17', name: 'Tocantins', abbreviation: 'TO' },
];

export const getStateName = (code: string) => BRAZIL_STATES.find((state) => state.code === code)?.name;

export const getFilterAreaName = ({ stateCode }: IHotspotFilters) =>
  (stateCode && getStateName(stateCode)) || BRAZIL.name;
