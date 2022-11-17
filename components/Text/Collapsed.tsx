import React, { useCallback, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useIntersectionObserver, {
  UseIntersectionCallbackType,
} from '@hooks/useIntersectionObserver';

type DirectionType = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

interface PositionInterface {
  x: number;
  y: number;
  direction: DirectionType;
}

interface CollapsedProps extends PositionInterface {
  children: React.ReactNode;
}

interface StyledCollapsedProps extends PositionInterface {
  isMove: boolean;
}

const Styled = {
  Collapsed: styled.div<StyledCollapsedProps>`
    transition: all 2s;

    /* keyframes */
    ${({ x, y }) => css`
      @keyframes text-collapsed-top {
        0% {
          transform: translate(${x}px, ${y}px);
        }
        20% {
          transform: translate(0px, -16px);
        }
        40% {
          transform: translate(0px, 8px);
        }
        60% {
          transform: translate(0px, -4px);
        }
        80% {
          transform: translate(0px, 2px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }

      @keyframes text-collapsed-right {
        0% {
          transform: translate(-${x}px, ${y}px);
        }
        20% {
          transform: translate(16px, 0px);
        }
        40% {
          transform: translate(-8px, 0px);
        }
        60% {
          transform: translate(4px, 0px);
        }
        80% {
          transform: translate(-2px, 0px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }

      @keyframes text-collapsed-bottom {
        0% {
          transform: translate(${x}px, ${y}px);
        }
        20% {
          transform: translate(0px, 16px);
        }
        40% {
          transform: translate(0px, -8px);
        }
        60% {
          transform: translate(0px, 4px);
        }
        80% {
          transform: translate(0px, -2px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }

      @keyframes text-collapsed-left {
        0% {
          transform: translate(${x}px, ${y}px);
        }
        20% {
          transform: translate(-16px, 0px);
        }
        40% {
          transform: translate(8px, 0px);
        }
        60% {
          transform: translate(-4px, 0px);
        }
        80% {
          transform: translate(2px, 0px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
    `}

    ${({ isMove, direction }) => {
      if (isMove) {
        return (
          isMove &&
          css`
            animation: ${`text-collapsed-${direction.toLowerCase()}`};
            animation-duration: 2s;
            animation-timing-function: ease-out;
            animation-iteration-count: forward;
          `
        );
      }
      return '';
    }}
  `,
};
/**
 * @description
 * 마치 어딘가에 부딪히는 것처럼 여러 텍스트를 동시에 특정 위치로 옮겨주고, 충돌 효과를 내준다.
 */
function Collapsed({ children, x, y, direction }: CollapsedProps) {
  const targetRef = useRef(null);
  const [isMove, setIsMove] = useState(true);

  const setIsMoveCallback = useCallback(() => {
    setIsMove(() => true);
  }, [setIsMove]);

  const callbackRef = useRef<UseIntersectionCallbackType>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsMoveCallback();
      }
    });
  });

  useIntersectionObserver(targetRef, callbackRef, {});

  return (
    <Styled.Collapsed isMove={isMove} x={x} y={y} direction={direction} ref={targetRef}>
      {children}
    </Styled.Collapsed>
  );
}

export default Collapsed;
