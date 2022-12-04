import React, { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { RecoilRoot } from 'recoil';

import CustomThemeProvider from '@styles/CustomThemeProvider';

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
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <RecoilRoot>
        <CustomThemeProvider>
          {/* eslint-disable react/jsx-props-no-spreading */}
          {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
        </CustomThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
