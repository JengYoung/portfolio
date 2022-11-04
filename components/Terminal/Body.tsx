import React, { useEffect, useState } from 'react';

import useTypingText from '@hooks/useTypingText';

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

interface TerminalBodyCommonProp {
  isActive: boolean;
}
interface TerminalBodyInterface extends TerminalBodyCommonProp {
  date: string;
}

interface TerminalBodyLogsInterface extends TerminalBodyCommonProp {
  initDelay: number;
}

function TerminalBodyLogs({ isActive, initDelay }: TerminalBodyLogsInterface) {
  const logs: { id: number; type: keyof typeof logColorsEnum; text: string }[] = readonly([
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
  ]);

  const [logClassNames, setLogClassNames] = useState(new Array(logs.length).fill(''));

  const logDelays: readonly number[] = readonly(
    [100, 500, 0, 300, 0, 20, 0, 10, 0, 43].reduce(
      (acc, cur) => [...acc, acc[acc.length - 1] + cur * 0.001],
      [initDelay]
    )
  );

  useEffect(() => {
    if (isActive) {
      logDelays.forEach((delay, idx) => {
        setTimeout(() => {
          setLogClassNames((state) =>
            state.map((className, i) =>
              i === idx ? [className, 'log--visible'].join(' ') : className
            )
          );
        }, delay * 1000);
      });
    }
  }, [isActive, logDelays]);

  return (
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
      {logs.map(({ id, type, text }, idx) => (
        <StyledBody.Log className={logClassNames[idx]} key={id}>
          <StyledBody.LogType color={logColorsEnum[type]}>{type}</StyledBody.LogType>
          {text}
        </StyledBody.Log>
      ))}
    </StyledBody.Logs>
  );
}

function TerminalBody({ isActive, date }: TerminalBodyInterface) {
  const TYPING_TEXT = 'yarn dev';
  const TYPING_DELAY = 50;

  const FIRST_TYPING_TOTAL_DELAY = TYPING_TEXT.length * TYPING_DELAY * 0.001;

  const { textsArr, textsArrIndex, setIsTyping } = useTypingText({
    texts: [TYPING_TEXT],
    delay: TYPING_DELAY,
    immediate: false,
  });

  useEffect(() => {
    setIsTyping(() => isActive);
  }, [isActive, setIsTyping]);

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

        <StyledBody.Command>
          {isActive && textsArr.map((text, idx) => text[textsArrIndex[idx].idx])}
        </StyledBody.Command>
        <StyledBody.Cursor isActive={isActive} delay={FIRST_TYPING_TOTAL_DELAY + 0.05} />
      </StyledBody.InputLineContainer>

      <TerminalBodyLogs initDelay={FIRST_TYPING_TOTAL_DELAY} isActive={isActive} />

      <StyledBody.Cursor isActive={!isActive} delay={FIRST_TYPING_TOTAL_DELAY + 0.05} />
    </StyledBody.Container>
  );
}

export default TerminalBody;
