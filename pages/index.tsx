import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { ScrollMouse } from '@components/Mouse';
import { Terminal } from '@components/Terminal';

const Styled = {
  Page: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: calc(100vh + 1px);

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
  `,
  Mouse: styled(ScrollMouse)`
    position: absolute;
    right: 50%;
    bottom: 0;
    left: 50%;
  `,
};
function HomePage() {
  const [isActive, setIsActive] = useState(false);

  const onCommand = (e: KeyboardEvent): any => {
    if (isActive || e.key !== 'Enter') return;

    setIsActive(() => true);
  };

  const onScroll = () => {
    if (isActive) return;

    setIsActive(() => true);
  };

  useEffect(() => {
    window.addEventListener('keydown', onCommand, false);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', onCommand);
      window.removeEventListener('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Page>
      <Terminal isActive={isActive} />
      <Styled.Mouse visible={!isActive} bottom="1rem" left="50%" right="50%" delay={0.3} />
    </Styled.Page>
  );
}

export default HomePage;
