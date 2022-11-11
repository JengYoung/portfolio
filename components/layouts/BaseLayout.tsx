import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import { BaseHeader } from '@components/Header';
import Navigator from '@components/Navigator/Navigator';

import { DirectionsEnum } from '@atoms/common/navigator';

import { LayoutInterface } from './types';

function BaseLayout({ children }: LayoutInterface) {
  const router = useRouter();

  return (
    <>
      <BaseHeader hidden={router.pathname === '/'} />
      <Navigator direction={DirectionsEnum.LEFT}>
        <main>{children}</main>
      </Navigator>
    </>
  );
}

export const getBaseLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default BaseLayout;
