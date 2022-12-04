import React from 'react';

import { useRecoilState } from 'recoil';

import { Global, ThemeProvider } from '@emotion/react';

import ColorSchemeAtom from '@atoms/common/colorScheme';

import { COLOR_SCHEME_DARK } from '@utils/constants';

import globalStyle from './globalStyle';
import { globalDarkTheme, globalLightTheme } from './globalTheme';

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorSchemeState] = useRecoilState(ColorSchemeAtom);

  const globalTheme =
    colorSchemeState.theme === COLOR_SCHEME_DARK ? globalDarkTheme : globalLightTheme;

  return (
    <ThemeProvider
      theme={colorSchemeState.theme === COLOR_SCHEME_DARK ? globalDarkTheme : globalLightTheme}
    >
      <Global styles={globalStyle(globalTheme)} />
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
