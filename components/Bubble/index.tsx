import React, { MouseEventHandler } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface BubbleProps {
  children: React.ReactNode;
  className: string;
  onClick: MouseEventHandler;
}

enum BgColors {
  Default = '#b791f3',
  Active = '#ff04b4',
}

const StyledPseudoElement = (bg: string) => css`
  position: absolute;

  display: block;
  width: 100%;
  height: 100%;

  content: '';

  background: radial-gradient(transparent, 70%, ${bg});

  border-radius: 50%;

  transition: all 1s;
`;

const StyledBubbleContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  cursor: pointer;

  border-radius: 50%;

  transition: all 0.5s ease-in;

  &:before {
    ${StyledPseudoElement(BgColors.Default)}
    opacity: 1;
  }
  &::after {
    ${StyledPseudoElement(BgColors.Active)}
    opacity: 0;
  }

  &:hover {
    transform: scale(1.05);
  }

  &.bubble--active {
    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }
`;

function Bubble({ className, children, onClick }: BubbleProps) {
  return (
    <StyledBubbleContainer className={className} onClick={onClick}>
      {children}
    </StyledBubbleContainer>
  );
}

export default Bubble;
