import React, { useState } from 'react';

import { StyledHamburger } from './styles';

interface HamburgerInterface {
  onClick: () => void;
  margin: string;
}
function Hamburger({ onClick, margin }: HamburgerInterface) {
  const [isActive, setIsActive] = useState(false);

  const onButtonClick = () => {
    onClick();
    setIsActive((state) => !state);
  };

  const arr = Array.from({ length: 3 }, (_, idx) => idx);
  return (
    <StyledHamburger.Container onClick={onButtonClick} margin={margin}>
      {arr.map((value) => (
        <StyledHamburger.LineContainer key={value} isActive={isActive}>
          <StyledHamburger.Line />
        </StyledHamburger.LineContainer>
      ))}
    </StyledHamburger.Container>
  );
}

export default Hamburger;
