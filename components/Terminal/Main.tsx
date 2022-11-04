import React from 'react';

import TerminalBody from './Body';
import TerminalHeader from './Header';
import { StyledTerminal } from './styles';

interface TerminalPropsInterface {
  isActive: boolean;
}
function Terminal({ isActive }: TerminalPropsInterface) {
  return (
    <StyledTerminal.Container>
      <TerminalHeader />
      <TerminalBody isActive={isActive} />
    </StyledTerminal.Container>
  );
}

export default Terminal;
