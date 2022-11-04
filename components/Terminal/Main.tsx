import { useRecoilState } from 'recoil';

import React from 'react';

import { IntroTarminalAtom } from '~/atoms';

import TerminalBody from './Body';
import TerminalHeader from './Header';
import { StyledTerminal } from './styles';

interface TerminalPropsInterface {
  isActive: boolean;
  date: string;
}

function Terminal({ isActive, date }: TerminalPropsInterface) {
  const [{ mode }] = useRecoilState(IntroTarminalAtom);

  return (
    <StyledTerminal.Container mode={mode}>
      <TerminalHeader />
      <TerminalBody isActive={isActive} date={date} />
    </StyledTerminal.Container>
  );
}

export default Terminal;
