import type { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import readonly from '../utils/readonly';
import { getTypingAnimationTextArr } from '../utils/animations/typing';
import useInterval from '../hooks/useInterval';

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const CatchphraseContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const Catchphrase = styled.div`
  font-family: 'Gowun Batang', serif;
  font-size: 2rem;
  line-height: 1.5;
`;

const Home: NextPage = () => {
  const texts = [
    '사람들은 추락을 두려워한다.',
    '하지만 사람은 누구나 바닥에서 태어난다.',
    '사람들은 잃었다고 생각하지만',
    '실상 잃은 것은 아무것도 없다.',
  ];

  const textsArr: string[][] = readonly(
    texts.map((text) => [''].concat(getTypingAnimationTextArr(text)))
  );

  const [textsArrIndex, setTextsArrIndex] = useState(
    Array.from({ length: textsArr.length }, () => ({
      isEnded: false,
      idx: 0,
    }))
  );

  const nowFlagIndex = useMemo(() => {
    return textsArrIndex.filter(({ isEnded }) => isEnded).length;
  }, [textsArrIndex]);

  const timerCallback = useCallback(() => {
    setTextsArrIndex((state) =>
      state.map(({ isEnded, idx }, index) => ({
        isEnded,
        idx: idx + +(index === nowFlagIndex),
      }))
    );
  }, [nowFlagIndex]);

  const { timerId, savedCallback } = useInterval(timerCallback, 50);

  useEffect(() => {
    if (textsArrIndex.every(({ isEnded }) => isEnded)) {
      return;
    }

    const nowMaxLength = textsArr[nowFlagIndex].length - 1;

    if (textsArrIndex[nowFlagIndex].idx === nowMaxLength) {
      clearInterval(timerId.current as NodeJS.Timeout);
      timerId.current = null;

      setTextsArrIndex((state) =>
        state.map(({ isEnded, idx }) => ({
          isEnded: idx === nowMaxLength ? true : isEnded,
          idx,
        }))
      );
    }
  }, [nowFlagIndex, timerId, textsArr, textsArrIndex]);

  useEffect(() => {
    if (timerId.current) return;
    if (textsArrIndex.every(({ isEnded }) => isEnded)) {
      return;
    }

    savedCallback.current = timerCallback;
    setTimeout(() => {
      timerId.current = setInterval(savedCallback.current, 50);
    }, 500);

    return () => {
      clearInterval(timerId.current as NodeJS.Timeout);
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [timerId, nowFlagIndex, savedCallback, timerCallback]);

  return (
    <Page className="page">
      <Head>
        <title>Jengyoung&apos;s Portfolio 🙆🏻</title>
        <meta name="description" content="front-end developer portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CatchphraseContainer className="page__intro-copy">
        {textsArr.map((text, index) => (
          <Catchphrase key={index}>
            {text[textsArrIndex[index].idx]}
          </Catchphrase>
        ))}
      </CatchphraseContainer>
    </Page>
  );
};

export default Home;
