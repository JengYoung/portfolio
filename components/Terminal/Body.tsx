import React from 'react';

import readonly from '@utils/readonly';

import { StyledBody } from './styles';

const paths: readonly string[] = readonly(['~', 'portfolio']);
const colors = ['black', '#0500ff', '#44B400'];

function TerminalBody() {
  return (
    <StyledBody.Container>
      <div>last login : Tue Nov 1: 22: 53 on hjys915</div>
      <StyledBody.EnterCommand>KEY PRESS ENTER!</StyledBody.EnterCommand>
      <StyledBody.InputLineContainer>
        <span>jengyoung@portfolio - MacBookPro</span>

        <StyledBody.Arrows>
          {paths.map((path, idx) => (
            <StyledBody.Arrow key={path} tailColor={colors[idx]} color={colors[idx + 1]}>
              {path}
            </StyledBody.Arrow>
          ))}
        </StyledBody.Arrows>
        <StyledBody.Command>yarn dev</StyledBody.Command>
        <StyledBody.Cursor />
      </StyledBody.InputLineContainer>
    </StyledBody.Container>
  );
}

export default TerminalBody;
