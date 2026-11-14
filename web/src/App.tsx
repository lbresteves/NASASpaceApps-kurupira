import { Global, ThemeProvider } from '@emotion/react';
import { HomePage } from '@pages';
import { globalStyles, theme } from '@shared/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <HomePage />
    </ThemeProvider>
  );
};
