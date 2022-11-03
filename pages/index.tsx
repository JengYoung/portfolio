import React from 'react';

import styled from '@emotion/styled';

import { Terminal } from '@components/Terminal';

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1000;

    content: '';

    background: ${({ theme }) =>
      `linear-gradient(${theme.colors.primary.dark} 15%, ${theme.colors.primary.light} 85% 100%)`};
  }
`;

function HomePage() {
  return (
    <Page>
      <Terminal />
    </Page>
  );
}

export default HomePage;
