import { Typography } from '../Typography/Typography';
import { AppFooterContainer } from './AppFooter.styled';

export interface IAppFooterProps {
  /** Pinned to the bottom of the screen; otherwise it sits in the flow, e.g. after the panel calendar. */
  isFixed?: boolean;
}

export const AppFooter = ({ isFixed = false }: IAppFooterProps) => {
  return (
    <AppFooterContainer isFixed={isFixed}>
      <Typography variant="caption" color="textSecondary">
        NASA Space Apps Challenge 2026 · Cuiabá, Brazil
      </Typography>
    </AppFooterContainer>
  );
};
