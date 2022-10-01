import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import readonly from '../utils/readonly';
import { getTypingAnimationTextArr } from '../utils/animations/typing';
import useInterval from '../hooks/useInterval';

const ExampleComponentCSS = styled.div`
  width: 1rem;
  height: 1rem;
  color: red;
  background-color: white;
`;

const Home: NextPage = () => {
  const text = `
    사람들은 추락을 두려워한다.
    하지만 사람은 누구나 바닥에서 태어난다.
    사람들은 잃는 것을 두려워하지만
    실상 잃은 것은 아무것도 없다.
  `;

  const textArr = readonly([''].concat(getTypingAnimationTextArr(text)));
  const maxIndex = textArr.length;

  const [textArrIndex, setTextArrIndex] = useState(0);
  const timerId = useInterval(timerCallback, 20);

  function timerCallback() {
    if (timerId.current === null) return;
    setTextArrIndex((idx) => idx + 1);
  }

  useEffect(() => {
    if (textArrIndex === maxIndex - 1) {
      clearInterval(timerId.current as NodeJS.Timeout);
    }
  }, [textArrIndex, maxIndex, timerId]);

  return (
    <div className="page">
      <Head>
        <title>Jengyoung&apos;s Portfolio 🙆🏻</title>
        <meta name="description" content="front-end developer portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page__intro-copy">{textArr[textArrIndex]}</div>
    </div>
  );
};

export default Home;
