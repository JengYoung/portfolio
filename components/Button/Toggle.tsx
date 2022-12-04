import React, { useState } from 'react';

import { StyledToggle } from './styles';

interface TogglePropsInterface {
  size: string;
  onToggle: () => void;
}
function Toggle({ size, onToggle }: TogglePropsInterface) {
  const [isToggle, setToggle] = useState(false);

  const onClickToggleButton = () => {
    setToggle((state) => !state);
    onToggle();
  };

  return (
    <StyledToggle.Container size={size} onClick={onClickToggleButton}>
      <StyledToggle.Inner size={size}>
        <StyledToggle.WheelContainer size={size} toggled={isToggle} />
      </StyledToggle.Inner>
    </StyledToggle.Container>
  );
}

export default Toggle;
