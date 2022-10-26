import type { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import readonly from '../utils/readonly';
import { getTypingAnimationTextArr } from '../utils/animations/typing';
import useInterval from '../hooks/useInterval';
import useTypingText from '@hooks/useTypingText';

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

  const { textsArr, textsArrIndex } = useTypingText({ texts, delay: 50 });
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
