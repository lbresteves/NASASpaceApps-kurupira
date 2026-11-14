import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fontFamily};
    -webkit-font-smoothing: antialiased;
  }
`;
