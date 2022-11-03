import React from 'react';

import { StyledTerminalHeader } from './styles';

function TerminalHeader() {
  return (
    <StyledTerminalHeader.Header>
      <StyledTerminalHeader.Circles>
        <StyledTerminalHeader.Circle />
        <StyledTerminalHeader.Circle />
        <StyledTerminalHeader.Circle />
      </StyledTerminalHeader.Circles>

      <StyledTerminalHeader.Title>
        JengYoung@github.com-FrontEndDeveloper:~/portfolio
      </StyledTerminalHeader.Title>
    </StyledTerminalHeader.Header>
  );
}

export default TerminalHeader;
