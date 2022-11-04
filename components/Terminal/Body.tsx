import React from 'react';

import readonly from '@utils/readonly';

import { StyledBody } from './styles';

// type LogType = 'event' | 'wait' | 'ready' | 'info';

const paths: readonly string[] = readonly(['~', 'portfolio']);
const colors = ['black', '#0500ff', '#44B400'];
enum logColorsEnum {
  event = '#ff00f5',
  wait = '#0DC0CB',
  ready = '#61C454',
  info = '#0DC0CB',
}

interface TerminalBodyInterface {
  isActive: boolean;
  date: string;
}

function TerminalBody({ isActive, date }: TerminalBodyInterface) {
  const logs: { id: number; type: keyof typeof logColorsEnum; text: string }[] = [
    { id: 1, type: 'ready', text: ' - started url: https://jengyoung.me' },
    {
      id: 2,
      type: 'info',
      text: ' - SWC minify release candidate enabled. https://nextjs.link/swcmin',
    },
    {
      id: 3,
      type: 'event',
      text: ' - compiled client and server successfully in 319 ms (178 modules)',
    },
    {
      id: 4,
      type: 'event',
      text: ' - compiled client and server successfully in 319 ms (178 modules)',
    },
    { id: 5, type: 'wait', text: ' - compilling...' },
    { id: 6, type: 'event', text: ' - compiled successfully in 16 ms (145 modules)' },
    { id: 7, type: 'wait', text: ' - compilling...' },
    { id: 8, type: 'event', text: ' - compiled successfully in 8 ms (33 modules)' },
    { id: 9, type: 'wait', text: ' - compilling...' },
    {
      id: 10,
      type: 'event',
      text: ' - compiled client and server successfully in 43 ms (178 modules)',
    },
  ];

  return (
    <StyledBody.Container>
      <div>last login : {date}</div>
      <StyledBody.EnterCommand isActive={isActive}>
        PRESS ENTER OR SCROLL {isActive ? 'SUCCESS' : 'DOWN!'}
        {isActive && `: portfolio application start...`}
      </StyledBody.EnterCommand>

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
        <StyledBody.Cursor isActive={isActive} />
      </StyledBody.InputLineContainer>

      <StyledBody.Logs isActive={isActive}>
        {/* <div>ready - started url: https://jengyoung.me</div>
        <div>info - SWC minify release candidate enabled. https://nextjs.link/swcmin</div>
        <div>event - compiled client and server successfully in 319 ms (178 modules)</div>
        <div>event - compiled client and server successfully in 319 ms (178 modules)</div>
        <div>wait - compiling...</div>
        <div>event - compiled successfully in 16 ms (145 modules)</div>
        <div>wait - compiling...</div>
        <div>event - compiled successfully in 8 ms (33 modules)</div>
        <div>wait - compiling...</div>
        <div>event - compiled client and server successfully in 43 ms (178 modules)</div> */}
        {logs.map(({ id, type, text }) => (
          <div key={id}>
            <StyledBody.LogType color={logColorsEnum[type]}>{type}</StyledBody.LogType>
            {text}
          </div>
        ))}
      </StyledBody.Logs>
      <StyledBody.Cursor isActive={!isActive} />
    </StyledBody.Container>
  );
}

export default TerminalBody;
