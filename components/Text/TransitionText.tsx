import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface TextInterface {
  $delay: number;
  $size: string;
}

interface TransitionTextInterface extends TextInterface {
  children: ReactNode;
}

const sizes = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

const Text = styled.div<TextInterface>`
  font-family: 'Gowun Batang', serif;
  font-size: 2rem;
  font-weight: 400;

  opacity: 0;

  ${({ $delay, $size }) => css`
    font-size: ${sizes[$size as keyof typeof sizes]};
    transition: all ${$delay}s;
  `}

  transform: translateY(1rem);
  &.text--active {
    opacity: 1;
    transform: translateY(0);
  }

  strong {
    color: #ffe600;
  }
`;

const TransitionText = ({
  $delay,
  $size,
  children,
}: TransitionTextInterface) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(() => {
    textRef.current && textRef.current.classList.add('text--active');
  });

  useIntersectionObserver(textRef, callbackRef, {});

  return (
    <Text $delay={$delay} $size={$size} ref={textRef}>
      {children}
    </Text>
  );
};

export default TransitionText;
