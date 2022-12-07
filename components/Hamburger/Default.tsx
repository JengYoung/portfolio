import React, { useEffect, useState } from 'react';

import { StyledHamburger } from './styles';

interface HamburgerInterface {
  onClick: () => void;
  margin: string;
  opened: boolean;
}
function Hamburger({ onClick, margin, opened }: HamburgerInterface) {
  const [isActive, setIsActive] = useState(false);

  const onButtonClick = () => {
    onClick();
    setIsActive((state) => !state);
  };

  useEffect(() => {
    setIsActive(() => opened);
  }, [opened]);

  const arr = Array.from({ length: 3 }, (_, idx) => idx);
  return (
    <StyledHamburger.Container
      onClick={onButtonClick}
      margin={margin}
      aria-label="pages-preview-button"
    >
      {arr.map((value) => (
        <StyledHamburger.LineContainer key={value} isActive={isActive}>
          <StyledHamburger.Line />
        </StyledHamburger.LineContainer>
      ))}
    </StyledHamburger.Container>
  );
}

export default Hamburger;
