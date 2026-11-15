export interface IRegionInsight {
  /** IBGE code of the state that opens this insight when clicked. */
  stateCode: string;
  title: string;
  paragraphs: string[];
  reference?: string;
}
