import { useLayoutEffect, useState } from 'react';

import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT, isWindow } from '@utils/index';

import { useLocalStorage } from './useLocalStorage';

const LOCAL_STORAGE_COLOR_SCHEME_KEY = 'pf-color-scheme';
const MEDIA_COLOR_SCHREME_QUERY = '(prefers-color-scheme: dark)';

const getScheme = () => {
  if (isWindow && window.matchMedia(MEDIA_COLOR_SCHREME_QUERY).matches) {
    return COLOR_SCHEME_DARK;
  }

  return COLOR_SCHEME_LIGHT;
};

export type ColorSchemeType = typeof COLOR_SCHEME_LIGHT | typeof COLOR_SCHEME_DARK | null;

export const useColorScheme = () => {
  const { getItem, setItem } = useLocalStorage();

  const [colorScheme, setColorScheme] = useState<ColorSchemeType>(null);

  const onChangeColorScheme = () => {
    setColorScheme((state) =>
      state === COLOR_SCHEME_DARK ? COLOR_SCHEME_LIGHT : COLOR_SCHEME_DARK
    );
  };

  useLayoutEffect(() => {
    if (!getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY)) {
      setItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme());
      setColorScheme(() => getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme()));
    }
  }, [getItem, setItem, colorScheme]);

  return { colorScheme, onChangeColorScheme };
};
