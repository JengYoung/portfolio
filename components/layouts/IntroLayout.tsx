import React, { ReactElement } from 'react';

import { IntroHeader } from '@components/Header';
import Navigator from '@components/Navigator/Navigator';

import { DirectionsEnum } from '@atoms/common/navigator';

import { LayoutInterface } from './types';

function IntroLayout({ children }: LayoutInterface) {
  return (
    <>
      <IntroHeader />
      <Navigator direction={DirectionsEnum.LEFT}>
        <main>{children}</main>
      </Navigator>
    </>
  );
}

export const getIntroLayout = (page: ReactElement) => <IntroLayout>{page}</IntroLayout>;

export default IntroLayout;
