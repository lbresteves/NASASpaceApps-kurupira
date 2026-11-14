import { FilledHalf, NorthLetter, OutlineHalf } from './styles/MapNorthArrow.styled';

export const MapNorthArrow = () => {
  return (
    <svg viewBox="0 0 24 48" width={24} height={48} role="img" aria-label="North arrow: north is up">
      <NorthLetter x="12" y="10" textAnchor="middle">
        N
      </NorthLetter>
      <OutlineHalf points="12,16 4,44 12,38" />
      <FilledHalf points="12,16 12,38 20,44" />
    </svg>
  );
};
