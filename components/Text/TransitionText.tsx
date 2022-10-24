import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

interface TextInterface {
  $pending?: number;
  $delay: number;
  $size: string;
  $fontWeight?: keyof typeof fontWeight;
}

interface TransitionTextInterface extends TextInterface {
  children: ReactNode;
}

const TEXT_CLASS_NAMES = {
  hidden: 'text--hidden',
  active: 'text--active',
};

const fontWeight = {
  extrabold: 900,
  bold: 700,
  medium: 400,
  thin: 300,
};

const sizes = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '4rem',
} as const;

const Text = styled.div<TextInterface>`
  /* font-family: 'Gowun Batang', serif; */
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.5;

  opacity: 0;

  ${({ $delay, $size, $fontWeight = 'medium' }) => css`
    font-size: ${sizes[$size as keyof typeof sizes]};
    font-weight: ${fontWeight[$fontWeight as keyof typeof fontWeight]};
    transition: all ${$delay}s;
  `}

  transform: translateY(1rem);

  &.${TEXT_CLASS_NAMES.active} {
    &:not(.${TEXT_CLASS_NAMES.hidden}) {
      opacity: 1;
      transform: translateY(0);
    }
  }

  strong {
    color: #ffe600;
  }
`;

const TransitionText = ({
  $pending = 0,
  $delay,
  $size,
  $fontWeight,
  children,
}: TransitionTextInterface) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [classNames, setClassNames] = useState(['text--hidden']);

  const callbackRef = useRef(() => {
    textRef.current &&
      setClassNames((state) => [...state, TEXT_CLASS_NAMES.active]);
  });

  useEffect(() => {
    setTimeout(() => {
      setClassNames((state) =>
        state.filter((cn) => cn !== TEXT_CLASS_NAMES.hidden)
      );
    }, $pending);
  }, [classNames, $pending]);

  useIntersectionObserver(textRef, callbackRef, {});

  return (
    <Text
      className={classNames.join(' ')}
      $pending={$pending}
      $delay={$delay}
      $size={$size}
      ref={textRef}
      $fontWeight={$fontWeight}
    >
      {children}
    </Text>
  );
};

export default TransitionText;
