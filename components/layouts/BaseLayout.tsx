import React, { ReactElement } from 'react';

import { BaseHeader } from '@components/Header';

import { LayoutInterface } from './types';

function BaseLayout({ children }: LayoutInterface) {
  return (
    <>
      <BaseHeader />
      <main>{children}</main>
    </>
  );
}

export const getBaseLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default BaseLayout;
