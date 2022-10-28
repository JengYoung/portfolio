import styled from '@emotion/styled';
import React from 'react';

interface BubbleProps {
  children: React.ReactNode;
}

const StyledBubbleContainer = styled.div`
  position: inline-block;
  display: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: radial-gradient(transparent, 70%, #b791f3);

  border-radius: 50%;

  transition: all 0.5s ease-in;

  &:hover {
    opacity: 1;
    transition: all 1s;

    transform: scale(1.05);
  }
`;

const Bubble = ({ children }: BubbleProps) => {
  return <StyledBubbleContainer>{children}</StyledBubbleContainer>;
};

export default Bubble;
