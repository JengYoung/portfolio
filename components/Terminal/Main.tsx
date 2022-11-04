import React from 'react';

import TerminalBody from './Body';
import TerminalHeader from './Header';
import { StyledTerminal } from './styles';

interface TerminalPropsInterface {
  isActive: boolean;
  date: string;
}
function Terminal({ isActive, date }: TerminalPropsInterface) {
  return (
    <StyledTerminal.Container>
      <TerminalHeader />
      <TerminalBody isActive={isActive} date={date} />
    </StyledTerminal.Container>
  );
}

export default Terminal;
