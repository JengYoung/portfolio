import styled from '@emotion/styled';
import React, { ReactNode, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Text = styled.div`
  font-family: 'Gowun Batang', serif;
  font-size: 2rem;
  font-weight: 400;

  color: white;
  opacity: 0;

  transition: all 1s;
  transform: translateY(1rem);

  &.text--active {
    opacity: 1;
    transform: translateY(0);
  }

  strong {
    color: #ffe600;
  }
`;

interface TransitionTextInterface {
  children: ReactNode;
}
const TransitionText = ({ children }: TransitionTextInterface) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(() => {
    textRef.current && textRef.current.classList.add('text--active');
  });

  useIntersectionObserver(textRef, callbackRef, {});

  return <div>{children}</div>;
};

export default TransitionText;
