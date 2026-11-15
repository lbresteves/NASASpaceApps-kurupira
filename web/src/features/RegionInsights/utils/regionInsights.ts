import type { IRegion } from '@shared/types';
import type { IRegionInsight } from '../types/IRegionInsight';

const INSIGHTS: IRegionInsight[] = [
  {
    stateCode: '13',
    title: 'Amazon rainforest',
    paragraphs: [
      'A quantitative study by Kumar et al. (2014) analyzed eight years of MODIS hotspot detections in the humid tropical forest of the Brazilian Amazon, looking at how fire relates in space to access routes. Fire was strongly concentrated along transport networks: about 50% of detections were less than 1 km from roads or navigable rivers, and about 95% were within 10 km of them.',
      'These results show that human access through road and river networks is the main driver of fire ignition in the Amazon.',
    ],
    reference: 'Kumar et al. (2014)',
  },
  {
    stateCode: '51',
    title: 'Mato Grosso',
    paragraphs: [
      'Mato Grosso holds about 13.5% of the forest cover of the Brazilian Legal Amazon. The state is under strong burning pressure tied to farming expansion, deforestation and pasture management, especially in the region known as the Arc of Deforestation. Forest fragmentation, human activity and dry periods together favor fires.',
    ],
    reference: 'Mota et al. (2019)',
  },
  {
    stateCode: '15',
    title: 'Pará',
    paragraphs: [
      'Pará holds about 24.1% of the forest cover of the Brazilian Legal Amazon, the second largest share among the states. Burning is closely tied to deforestation, logging and farming expansion. Clearing land and fragmenting the forest make it more vulnerable to fire, especially during dry periods.',
    ],
    reference: 'Santos, K. S.; Silva, D. D.; Guimarães, R. J. P. S. (2020)',
  },
];

const INSIGHTS_BY_STATE = new Map(INSIGHTS.map((insight) => [insight.stateCode, insight]));

export const getRegionInsight = (region: IRegion) =>
  region.kind === 'state' ? INSIGHTS_BY_STATE.get(region.id) : undefined;

/** Puts the insight on top of the stack, moving it there if it is already open. */
export const pushInsight = (stack: IRegionInsight[], insight: IRegionInsight) => [
  insight,
  ...stack.filter((item) => item.stateCode !== insight.stateCode),
];

export const removeInsight = (stack: IRegionInsight[], stateCode: string) =>
  stack.filter((item) => item.stateCode !== stateCode);
