import React from 'react';

import { StyledTerminalHeader } from './styles';

function TerminalHeader() {
  const onGreenButtonClick = (e) => {
    console.log(e);
  };
  return (
    <StyledTerminalHeader.Header>
      <StyledTerminalHeader.Circles>
        <StyledTerminalHeader.Circle />
        <StyledTerminalHeader.Circle />
        <StyledTerminalHeader.Circle onClick={onGreenButtonClick} />
      </StyledTerminalHeader.Circles>

      <StyledTerminalHeader.Title>
        JengYoung@github.com-FrontEndDeveloper:~/portfolio
      </StyledTerminalHeader.Title>
    </StyledTerminalHeader.Header>
  );
}

export default TerminalHeader;
