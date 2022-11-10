import React, { AnimationEvent, ReactElement, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import NavigatorAtom, { getLastHistory } from '@atoms/common/navigator';

const Page = styled.div`
  position: absolute;
  width: 100%;
`;

const Styled = {
  Navigator: styled.div`
    position: relative;
    height: 100vh;
    perspective: 100vw;
  `,
  Prev: styled(Page)<{ navigating: boolean }>`
    position: relative;
    z-index: -1000;
    transform-origin: center;

    animation: navigate-page-prev 1s forwards;

    @keyframes navigate-page-prev {
      to {
        opacity: 0;
        transform: translateX(-10%) translateZ(-200px);
        transform-style: preserve-3d;
      }
    }
  `,
  Now: styled(Page)<{ navigating: boolean }>`
    z-index: 1000;
    transform: translateX(100%);

    animation: navigate-page-now 1s forwards;
    @keyframes navigate-page-now {
      to {
        transform: translateX(0%);
      }
    }
  `,
};

function Navigator({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [navigatorState, setNavigatorState] = useRecoilState(NavigatorAtom);

  const lastHistory = useRecoilValue(getLastHistory);

  useEffect(() => {
    setNavigatorState((state) => ({
      ...state,
      navigating: true,
    }));

    return () => {
      if (lastHistory?.key !== router.pathname)
        setNavigatorState((state) => ({
          ...state,
          navigating: false,
          index: state.index + 1,
          histories: [
            ...state.histories,
            { key: `${Date.now()}`, element: React.cloneElement(children as ReactElement) },
          ],
        }));
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [router.pathname]);

  const onNavigatePrevPage = (e: AnimationEvent) => {
    if (!e.animationName.includes('navigate-page')) return;

    setNavigatorState((state) => ({
      ...state,
      navigating: false,
    }));
  };

  return (
    <Styled.Navigator id="navigator">
      <Styled.Now
        key={router.pathname}
        id="now"
        onAnimationEnd={onNavigatePrevPage}
        navigating={navigatorState.navigating}
      >
        {children}
      </Styled.Now>

      {!!navigatorState.navigating && !!navigatorState.histories.length && lastHistory !== null && (
        <Styled.Prev
          id="prev"
          key={lastHistory.key}
          onAnimationEnd={onNavigatePrevPage}
          navigating={navigatorState.navigating}
        >
          {navigatorState.histories[navigatorState.histories.length - 1].element}
        </Styled.Prev>
      )}
    </Styled.Navigator>
  );
}

export default Navigator;
