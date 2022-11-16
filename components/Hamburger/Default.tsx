import React from 'react';

import { StyledHamburger } from './styles';

function Hamburger() {
  return (
    <StyledHamburger.Container>
      <StyledHamburger.LineContainer>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
      <StyledHamburger.LineContainer>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
      <StyledHamburger.LineContainer>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
    </StyledHamburger.Container>
  );
}

export default Hamburger;
