import React from 'react';

import styled from '@emotion/styled';

interface MousePropsInterface {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  visible: boolean;
  delay?: number;
}

const Styled = {
  Container: styled.div<Pick<MousePropsInterface, 'visible'>>`
    opacity: ${({ visible }) => +visible};
    transition: all 0.5s;
  `,
  Inner: styled.div<MousePropsInterface>`
    position: absolute;
    top: ${({ top }) => top ?? 'auto'};
    right: ${({ right }) => right ?? 'auto'};
    bottom: ${({ bottom }) => bottom ?? 'auto'};
    left: ${({ left }) => left ?? 'auto'};

    display: flex;
    justify-content: center;
    width: 2.25em;
    height: 3em;

    padding: 0.5em;

    border: 2px solid ${({ theme }) => theme.colors.subPrimary};
    border-radius: 40%;

    opacity: 0;

    animation: mouse-visible;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-delay: ${({ delay }) => delay}s;
    animation-fill-mode: forwards;

    @keyframes mouse-visible {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  Wheel: styled.div`
    position: absolute;
    width: 0.375em;
    height: 0.375em;

    background-color: ${({ theme }) => theme.colors.subPrimary};
    border-radius: 50%;

    animation: scroll-mouse 1.5s infinite ease-out;

    @keyframes scroll-mouse {
      0% {
        opacity: 1;
        transform: translateY(0%);
      }
      100% {
        opacity: 0.3;
        transform: translateY(1.25em);
      }
    }
  `,
};

function ScrollMouse({ top, bottom, right, left, visible, delay }: MousePropsInterface) {
  return (
    <Styled.Container visible={visible}>
      <Styled.Inner
        visible={visible}
        top={top}
        bottom={bottom}
        right={right}
        left={left}
        delay={delay}
      >
        <Styled.Wheel />
      </Styled.Inner>
    </Styled.Container>
  );
}

const POSITION_DEFAULT_VALUE = 'auto';

ScrollMouse.defaultProps = {
  top: POSITION_DEFAULT_VALUE,
  left: POSITION_DEFAULT_VALUE,
  right: POSITION_DEFAULT_VALUE,
  bottom: POSITION_DEFAULT_VALUE,
  delay: 0,
};

export default ScrollMouse;
