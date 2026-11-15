import { CloseButton, WarningIcon } from '@shared/components';
import type { IRegionInsight } from '../types/IRegionInsight';
import {
  InsightCard,
  InsightHeading,
  InsightReference,
  InsightStack,
  InsightText,
  InsightTitle,
  InsightTitleButton,
} from './styles/RegionInsights.styled';

export interface IRegionInsightStackProps {
  /** Newest first: the first insight is shown open on top, the older ones collapse to their title below it. */
  insights: IRegionInsight[];
  onClose: (stateCode: string) => void;
  onBringToFront: (insight: IRegionInsight) => void;
}

export const RegionInsightStack = ({ insights, onClose, onBringToFront }: IRegionInsightStackProps) => {
  return (
    <InsightStack aria-live="polite" aria-label="Region insights">
      {insights.map((insight, index) => {
        const isOpen = index === 0;
        return (
          <InsightCard key={insight.stateCode} aria-label={insight.title} isOpen={isOpen}>
            <InsightHeading>
              <WarningIcon />
              {isOpen ? (
                <InsightTitle>{insight.title}</InsightTitle>
              ) : (
                <InsightTitleButton type="button" onClick={() => onBringToFront(insight)}>
                  {insight.title}
                </InsightTitleButton>
              )}
              <CloseButton size="sm" label={`Close ${insight.title}`} onClick={() => onClose(insight.stateCode)} />
            </InsightHeading>
            {isOpen && (
              <>
                {insight.paragraphs.map((paragraph) => (
                  <InsightText key={paragraph}>{paragraph}</InsightText>
                ))}
                {insight.reference && <InsightReference>Ref: {insight.reference}</InsightReference>}
              </>
            )}
          </InsightCard>
        );
      })}
    </InsightStack>
  );
};
