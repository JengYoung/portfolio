import React, { ReactElement } from 'react';

import { IntroHeader } from '@components/Header';

import { LayoutInterface } from './types';

function IntroLayout({ children }: LayoutInterface) {
  return (
    <>
      <IntroHeader />
      <main>{children}</main>
    </>
  );
}

export const getIntroLayout = (page: ReactElement) => <IntroLayout>{page}</IntroLayout>;

export default IntroLayout;
