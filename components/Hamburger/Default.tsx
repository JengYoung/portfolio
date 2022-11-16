import React, { useState } from 'react';

import { StyledHamburger } from './styles';

interface HamburgerInterface {
  onClick: () => void;
}
function Hamburger({ onClick }: HamburgerInterface) {
  const [isActive, setIsActive] = useState(false);
  const onButtonClick = () => {
    onClick();
    setIsActive((state) => !state);
  };
  return (
    <StyledHamburger.Container onClick={onButtonClick}>
      <StyledHamburger.LineContainer isActive={isActive}>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
      <StyledHamburger.LineContainer isActive={isActive}>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
      <StyledHamburger.LineContainer isActive={isActive}>
        <StyledHamburger.Line />
      </StyledHamburger.LineContainer>
    </StyledHamburger.Container>
  );
}

export default Hamburger;
