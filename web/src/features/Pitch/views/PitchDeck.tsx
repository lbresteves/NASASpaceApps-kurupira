import { IconButton } from '@shared/components';
import { useSlideDeck } from '../hooks/useSlideDeck';
import { useSwipe } from '../hooks/useSwipe';
import { PITCH_SLIDES, SLIDE_HEIGHT_PX, SLIDE_WIDTH_PX } from '../utils/slides';
import { ArrowIcon, DeckControls, SlideCounter, SlideFrame, SlideImage } from './styles/PitchDeck.styled';

const SLIDE_SOURCES = PITCH_SLIDES.map((slide) => slide.src);

export const PitchDeck = () => {
  const { index, canGoBack, canGoForward, goBack, goForward } = useSlideDeck(SLIDE_SOURCES);
  const swipeHandlers = useSwipe(goForward, goBack);
  const slide = PITCH_SLIDES[index];

  return (
    <>
      <SlideFrame {...swipeHandlers}>
        <SlideImage src={slide.src} alt={slide.alt} width={SLIDE_WIDTH_PX} height={SLIDE_HEIGHT_PX} draggable={false} />
      </SlideFrame>
      <DeckControls>
        <IconButton
          label="Previous slide"
          disabled={!canGoBack}
          onClick={goBack}
          icon={
            <ArrowIcon viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3L5 8l5 5" />
            </ArrowIcon>
          }
        />
        <SlideCounter aria-live="polite" aria-label={`Slide ${index + 1} of ${PITCH_SLIDES.length}`}>
          {index + 1} / {PITCH_SLIDES.length}
        </SlideCounter>
        <IconButton
          label="Next slide"
          disabled={!canGoForward}
          onClick={goForward}
          icon={
            <ArrowIcon viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6 3l5 5-5 5" />
            </ArrowIcon>
          }
        />
      </DeckControls>
    </>
  );
};
