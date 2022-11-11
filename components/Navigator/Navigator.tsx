import React, {
  AnimationEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import NavigatorAtom, { DirectionsEnum } from '@atoms/common/navigator';

const Page = styled.div<{ direction: DirectionsEnum; navigating: boolean }>`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const Styled = {
  Navigator: styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    perspective: 100vw;
    overflow: hidden;
  `,
  Prev: styled(Page)`
    position: relative;
    z-index: -1000;
    transform-origin: center;

    animation: ${({ direction, navigating }) =>
      navigating
        ? ` navigate-page-prev-${direction} 1s forwards;
      `
        : ``};

    @keyframes navigate-page-prev-left {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(-100%);
      }
    }
    @keyframes navigate-page-prev-right {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(100%);
      }
    }
    @keyframes navigate-page-up {
      from {
        transform: translateY(0%);
      }
      to {
        transform: translateY(-100%);
      }
    }

    @keyframes navigate-page-prev-bottom {
      from {
        transform: translateY(0%);
      }
      to {
        transform: translateY(100%);
      }
    }
  `,

  Now: styled(Page)<{ isFirstRender: boolean }>`
    z-index: 1000;
    animation: ${({ isFirstRender, direction, navigating }) =>
      !isFirstRender && navigating
        ? ` navigate-page-now-${direction} 1s forwards;
      `
        : ``};
    @keyframes navigate-page-now-left {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0%);
      }
    }
    @keyframes navigate-page-now-right {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0%);
      }
    }

    @keyframes navigate-page-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0%);
      }
    }
    @keyframes navigate-page-bottom {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0%);
      }
    }
  `,
};

interface NavigatorInterface {
  direction: DirectionsEnum;
  children: React.ReactNode;
}

function Navigator({ direction, children }: NavigatorInterface) {
  const router = useRouter();

  const pageRef = useRef<HTMLDivElement>(null);

  const [navigatorState, setNavigatorState] = useRecoilState(NavigatorAtom);
  const [isFinished, setIsFinished] = useState(false);

  const finalDirection = useMemo(() => {
    const reversed = {
      left: DirectionsEnum.RIGHT,
      right: DirectionsEnum.LEFT,
      up: DirectionsEnum.BOTTOM,
      bottom: DirectionsEnum.UP,
    };

    if (isFinished) {
      if (navigatorState.reversed) return reversed[direction];
    }

    return navigatorState.reversed ? reversed[direction] : direction;
  }, [isFinished, navigatorState, direction]);

  /* NOTE:
   * 1. popstate -> navigating true, reversed true
   * 2. unmount prev page -> navigating false;
   * 3. mount now page -> navigating true;
   * 4. animated
   * 5. animationEnd -> isFinished true, reversed false
   */
  useLayoutEffect(() => {
    const onPopState = () => {
      setNavigatorState((state) => ({
        ...state,
        navigating: true,
        reversed: true,
      }));
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [setNavigatorState]);

  useEffect(() => {
    if (pageRef.current === null) return;

    pageRef.current.addEventListener('scroll', () => {
      const customEvent = new CustomEvent('page-scroll', { detail: { name: 'hi' } });
      window.dispatchEvent(customEvent);
    });
  }, [pageRef]);

  useEffect(() => {
    setNavigatorState((state) => ({
      ...state,
      navigating: true,
    }));

    return () => {
      setNavigatorState((state) => ({
        ...state,
        navigating: false,
        prevPage: React.cloneElement(children as React.ReactElement),
        prevKey: router.pathname,
      }));
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [setNavigatorState, router.pathname]);

  const finishNavigate = (e: AnimationEvent) => {
    if (e.animationName.startsWith('navigate-page')) {
      setIsFinished(() => true);

      setNavigatorState((state) => ({
        ...state,
        navigating: false,
        reversed: false,
        prevPage: React.cloneElement(children as React.ReactElement),
      }));
    }
  };

  return (
    <Styled.Navigator id="navigator">
      {navigatorState.prevKey !== router.pathname &&
        navigatorState.navigating &&
        navigatorState.prevPage && (
          <Styled.Prev direction={finalDirection} navigating={navigatorState.navigating}>
            {navigatorState.prevPage}
          </Styled.Prev>
        )}

      <Styled.Now
        ref={pageRef}
        key={router.pathname}
        id="now"
        isFirstRender={!navigatorState.prevKey || navigatorState.prevKey === router.pathname}
        direction={finalDirection}
        navigating={navigatorState.navigating}
        onAnimationEnd={finishNavigate}
      >
        {children}
      </Styled.Now>
    </Styled.Navigator>
  );
}

export default Navigator;
