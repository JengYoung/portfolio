import React, { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { IntroTarminalAtom } from '@atoms';
import { ButtonActionTypeEnum } from '@atoms/intro/terminal';

import useTypingText from '@hooks/useTypingText';

import terminalData from '@assets/dataset/terminal.json';

import readonly from '@utils/readonly';

import { StyledBody } from './styles';

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

const delays = [0, 500, 0, 300, 0, 20, 0, 10, 0, 43];
function TerminalBodyLogs({ isActive, initDelay }: TerminalBodyLogsInterface) {
  const logs: { id: number; type: keyof typeof logColorsEnum; text: string }[] =
    readonly(terminalData);

  const [logClassNames, setLogClassNames] = useState(new Array(logs.length).fill(''));
  const router = useRouter();

  /**
   * @description
   * log들이 엔터나 스크롤을 하면 순차적으로 나오면서 마치 터미널에서 서버가 활성화되는 효과를 줍니다.
   * 이에 대한 딜레이를 지정해주는 배열입니다.
   */
  const logDelays: number[] = useMemo(
    () =>
      delays.reduce(
        (acc: number[], cur: number) => [...acc, acc[acc.length - 1] + cur * 0.001],
        [initDelay + 0.1]
      ),
    [initDelay]
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

          setTimeout(() => {
            if (idx === logDelays.length - 1) {
              router.push('/about');
            }
          }, 300);
        }, delay * 1000);
      });
    }
  }, [isActive, logDelays, router]);

  return (
    <StyledBody.Logs isActive={isActive}>
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
  const [{ mode }] = useRecoilState(IntroTarminalAtom);
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
        PRESS ENTER OR SCROLL{' '}
        {(isActive ? 'SUCCESS' : 'DOWN!') +
          (mode === ButtonActionTypeEnum.orange || mode === ButtonActionTypeEnum.red
            ? 'PRESS ENTER OR SCROLL DOWN!'.repeat(10)
            : '')}
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
