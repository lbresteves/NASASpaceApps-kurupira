import styled from '@emotion/styled';
import type { ICommonStyledProps } from '@shared/types';
import { buildStyledProps, commonStyledPropNames, omitProps } from '@shared/utils';

export const ViewContentStyled = styled('div', {
  shouldForwardProp: omitProps(...commonStyledPropNames),
})<ICommonStyledProps>(({ theme, ...styledProps }) => buildStyledProps(styledProps, theme));
