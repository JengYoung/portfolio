import { BaseHeader } from '@components/Header';
import React, { ReactElement } from 'react';

import { LayoutInterface } from './types';

const BaseLayout = ({ children }: LayoutInterface) => {
  return (
    <>
      <BaseHeader></BaseHeader>
      <main>{children}</main>
    </>
  );
};

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export default BaseLayout;
