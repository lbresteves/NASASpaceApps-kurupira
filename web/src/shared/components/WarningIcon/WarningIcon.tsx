import { WarningIconStyled } from './WarningIcon.styled';

/** Yellow warning triangle placed before alert titles. Decorative: the title carries the meaning. */
export const WarningIcon = () => {
  return <WarningIconStyled aria-hidden="true">⚠</WarningIconStyled>;
};
