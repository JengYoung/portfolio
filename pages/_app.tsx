import React, { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import { Global, ThemeProvider } from '@emotion/react';

import { useColorScheme } from '@hooks/useColorScheme';

import { globalDarkTheme, globalLightTheme, globalStyle } from '@styles/index';

import { COLOR_SCHEME_DARK } from '@utils/constants';

/**
 * @description
 * 각 페이지에 여러 레이아웃을 넣고 싶을 때에는 다음과 같이 사용할 수 있다.
 *
 * @see: https://nextjs.org/docs/basic-features/layouts
 */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // NOTE: 이는 Next.js에서 기본적으로 주어진 코드이므로 그냥 사용하려 한다.
  const getLayout = Component.getLayout ?? ((page) => page);
  const { colorScheme } = useColorScheme();
  const globalTheme = colorScheme === COLOR_SCHEME_DARK ? globalDarkTheme : globalLightTheme;

  return (
    <ThemeProvider theme={globalTheme}>
      <Global styles={globalStyle(globalTheme)} />
      <RecoilRoot>
        {/* eslint-disable react/jsx-props-no-spreading */}
        {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
