import styled from '@emotion/styled';
import React from 'react';

const StyledBubbleContainer = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(transparent, 70%, #752bed);

  border-radius: 50%;
  opacity: 0.5;

  transition: all 0.5s ease-in;

  &:hover {
    opacity: 1;
    transition: all 1s;

    transform: scale(1.05);
  }
`;

const Bubble = () => {
  return <StyledBubbleContainer></StyledBubbleContainer>;
};

export default Bubble;
