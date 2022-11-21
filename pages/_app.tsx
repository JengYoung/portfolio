import React, { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import { Global, ThemeProvider } from '@emotion/react';

import { globalStyle, globalTheme } from '@styles/index';

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
  return (
    <ThemeProvider theme={globalTheme}>
      <Global styles={globalStyle} />
      <RecoilRoot>
        {/* eslint-disable react/jsx-props-no-spreading */}
        {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
