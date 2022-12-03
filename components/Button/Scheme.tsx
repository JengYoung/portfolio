import React, { useLayoutEffect } from 'react';

import { useRecoilState } from 'recoil';

import ColorSchemeAtom from '@atoms/common/colorScheme';

import { useLocalStorage } from '@hooks/useLocalStorage';

import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '@utils/constants';
import { isWindow } from '@utils/isWindow';

import { StyledScheme } from './styles';

const LOCAL_STORAGE_COLOR_SCHEME_KEY = 'pf-color-scheme';
const MEDIA_COLOR_SCHREME_QUERY = '(prefers-color-scheme: dark)';

interface SchemeButtonPropsInterface {
  size: string;
}

const getScheme = () => {
  if (isWindow && window.matchMedia(MEDIA_COLOR_SCHREME_QUERY).matches) {
    return COLOR_SCHEME_DARK;
  }

  return COLOR_SCHEME_LIGHT;
};

function Scheme({ size }: SchemeButtonPropsInterface) {
  const [colorSchemeState, setColorSchemeState] = useRecoilState(ColorSchemeAtom);
  const { localStorage, getItem, setItem } = useLocalStorage();

  const onChangeColorScheme = () => {
    setColorSchemeState((state) => {
      const nextTheme = state.theme === COLOR_SCHEME_DARK ? COLOR_SCHEME_LIGHT : COLOR_SCHEME_DARK;
      setItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, nextTheme);

      return {
        ...state,
        theme: nextTheme,
      };
    });
  };

  useLayoutEffect(() => {
    if (!localStorage) return;

    if (!getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY)) {
      setItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme());
    }

    setColorSchemeState((state) => ({
      ...state,
      theme: getItem(LOCAL_STORAGE_COLOR_SCHEME_KEY, getScheme()),
    }));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [colorSchemeState.theme, localStorage]);

  return (
    <StyledScheme.Container
      size={size}
      scheme={colorSchemeState.theme}
      onClick={onChangeColorScheme}
    >
      <StyledScheme.Moon scheme={colorSchemeState.theme} />
      <StyledScheme.Sun scheme={colorSchemeState.theme} />
    </StyledScheme.Container>
  );
}

export default Scheme;
