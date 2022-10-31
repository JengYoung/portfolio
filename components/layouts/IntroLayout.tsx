import { IntroHeader } from '@components/Header';
import React, { ReactElement } from 'react';
import { LayoutInterface } from './types';

const IntroLayout = ({ children }: LayoutInterface) => {
  return (
    <>
      <IntroHeader />
      <main>{children}</main>
    </>
  );
};

export const getIntroLayout = (page: ReactElement) => {
  return <IntroLayout>{page}</IntroLayout>;
};

export default IntroLayout;
