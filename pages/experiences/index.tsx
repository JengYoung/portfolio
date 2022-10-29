import { getBaseLayout } from '@components/layouts';
import styled from '@emotion/styled';
import React from 'react';

const ExpriencePage = () => {
  return <Styled.Container>ExpriencePage</Styled.Container>;
};

ExpriencePage.getLayout = getBaseLayout;

const Styled = {
  Container: styled.section`
    width: 100%;
    height: 100vh;

    padding-top: 4rem;
  `,
};
export default ExpriencePage;
