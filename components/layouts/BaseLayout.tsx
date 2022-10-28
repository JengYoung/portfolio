import { DefaultHeader } from '@components/Header';
import React, { ReactNode } from 'react';

interface BaseLayoutInterface {
  children: ReactNode;
}
const BaseLayout = ({ children }: BaseLayoutInterface) => {
  return (
    <>
      <DefaultHeader />
      <main>{children}</main>
    </>
  );
};

export default BaseLayout;
