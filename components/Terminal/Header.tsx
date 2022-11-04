import { useRecoilState } from 'recoil';

import React from 'react';

import { IntroTarminalAtom } from '~/atoms';
import { ButtonActionTypeEnum } from '~/atoms/intro/terminal';

import { StyledTerminalHeader } from './styles';

function TerminalHeader() {
  const [introTerminalState, setIntroTerminalState] = useRecoilState(IntroTarminalAtom);

  const onClick = (actionType: ButtonActionTypeEnum) => {
    if (introTerminalState.loading) {
      if (
        actionType === ButtonActionTypeEnum.green &&
        introTerminalState.mode === ButtonActionTypeEnum.green
      ) {
        setIntroTerminalState({
          mode: null,
          loading: false,
        });
      }
      return;
    }

    const nextState = {
      mode: actionType,
      loading: true,
    };

    setIntroTerminalState(nextState);

    if (actionType === ButtonActionTypeEnum.green) {
      return;
    }

    setTimeout(() => {
      setIntroTerminalState({
        ...introTerminalState,
        mode: null,
        loading: false,
      });
    }, 1000);
  };

  return (
    <StyledTerminalHeader.Header>
      <StyledTerminalHeader.Circles>
        <StyledTerminalHeader.Circle onClick={() => onClick(ButtonActionTypeEnum.red)} />
        <StyledTerminalHeader.Circle onClick={() => onClick(ButtonActionTypeEnum.orange)} />
        <StyledTerminalHeader.Circle onClick={() => onClick(ButtonActionTypeEnum.green)} />
      </StyledTerminalHeader.Circles>

      <StyledTerminalHeader.Title>
        JengYoung@github.com-FrontEndDeveloper:~/portfolio
      </StyledTerminalHeader.Title>
    </StyledTerminalHeader.Header>
  );
}

export default TerminalHeader;
