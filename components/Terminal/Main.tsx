import React from 'react';

import { useRecoilState } from 'recoil';

import { IntroTarminalAtom } from '~/atoms';

import TerminalBody from './Body';
import TerminalHeader from './Header';
import { StyledTerminal } from './styles';
import { TerminalPropsInterface } from './types';

function Terminal({ data, delays, isActive, date }: TerminalPropsInterface) {
  const [{ mode }] = useRecoilState(IntroTarminalAtom);

  return (
    <StyledTerminal.Container mode={mode}>
      <TerminalHeader />
      <TerminalBody delays={delays} data={data} isActive={isActive} date={date} />
    </StyledTerminal.Container>
  );
}

export default Terminal;
