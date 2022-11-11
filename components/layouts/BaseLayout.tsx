import React, { ReactElement } from 'react';

import { BaseHeader } from '@components/Header';
import Navigator from '@components/Navigator/Navigator';

import { DirectionsEnum } from '@atoms/common/navigator';

import { LayoutInterface } from './types';

function BaseLayout({ children }: LayoutInterface) {
  return (
    <>
      <BaseHeader />
      <Navigator direction={DirectionsEnum.LEFT}>
        <main>{children}</main>
      </Navigator>
    </>
  );
}

export const getBaseLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default BaseLayout;
