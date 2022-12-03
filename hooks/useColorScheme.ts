import { useLayoutEffect, useState } from 'react';

import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT, isWindow } from '@utils/index';

import { useLocalStorage } from './useLocalStorage';

const LOCAL_STORAGE_COLOR_SCHEME_KEY = 'pf-color-scheme';
const MEDIA_COLOR_SCHREME_QUERY = '(prefers-color-scheme: dark)';

const getScheme = () =>
  isWindow && window.matchMedia(MEDIA_COLOR_SCHREME_QUERY).matches
    ? COLOR_SCHEME_DARK
    : COLOR_SCHEME_LIGHT;

export const useColorScheme = () => {
  const { getItem, setItem } = useLocalStorage();

  const [colorScheme, setColorScheme] = useState<
    typeof COLOR_SCHEME_LIGHT | typeof COLOR_SCHEME_DARK
  >(getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme()));

  useLayoutEffect(() => {
    if (!getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY)) {
      setItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme());
    }
  }, [getItem, setItem]);

  return { colorScheme, setColorScheme };
};
