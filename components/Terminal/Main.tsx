import React from 'react';

import TerminalBody from './Body';
import TerminalHeader from './Header';
import { StyledTerminal } from './styles';

function Terminal() {
  return (
    <StyledTerminal.Container>
      <TerminalHeader />
      <TerminalBody />
    </StyledTerminal.Container>
  );
}

export default Terminal;
