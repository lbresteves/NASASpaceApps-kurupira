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

  /* Minimal scroll bars: a thin rounded thumb in the map-line green, no track, no arrows. */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.mapBorder};
  }

  /* Firefox has no ::-webkit-scrollbar; Chrome would drop the rules above if it saw scrollbar-color. */
  @-moz-document url-prefix() {
    * {
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.border} transparent;
    }
  }
`;
