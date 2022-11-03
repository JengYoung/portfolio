import React, { useMemo, useRef } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball/Canvas';
import { GradientType } from '@components/Metaball/types';
import CopyStyle from '@components/Text';
import { getIntroLayout } from '@components/layouts';

import useMetaball from '@hooks/useMetaball';
import useTypingText from '@hooks/useTypingText';
import useWindow from '@hooks/useWindow';

const Page = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.viewPort.desktopMax};
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const Catchphrase = styled.div`
  font-family: 'Gowun Batang', serif;
  font-size: 2rem;
  line-height: 1.5;
`;

const Button = styled.button`
  ${CopyStyle.Large}
  display: block;

  width: 5rem;
  height: 5rem;

  font-weight: 700;

  background: #333;

  border: 0;
  border-radius: 50%;

  transition: all 1s;

  &.button--visible {
    opacity: 1;

    &:hover {
      color: #333;
      cursor: pointer;
      background: white;
    }
  }
  &.button--invisible {
    opacity: 0;
    transform: rotate(90deg) scale(0.75);
  }
`;

function HomePage() {
  const initialGradientColors: GradientType = ['#770084', '#ab0746'];
  const metaballGradientColors: GradientType = ['#9000ff', '#ff3dbb'];
  const { windowState } = useWindow(['innerWidth', 'innerHeight']);

  const greetRef = useRef(null);

  const texts = ['안녕하세요!', '프론트엔드 개발자', '황재영입니다.'];

  useMetaball({
    canvasRef: greetRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: windowState.innerWidth / 2,
      y: windowState.innerHeight / 2,
      r: 200,
    },
    options: {
      bubbleNum: 4,
      absorbBallNum: 5,
      canvasWidth: windowState.innerWidth,
      canvasHeight: windowState.innerHeight,
    },
  });

  const { textsArr, textsArrIndex } = useTypingText({ texts, delay: 50 });

  const buttonClassName = useMemo(
    () => (textsArrIndex.some((obj) => obj.isEnded) ? 'button--visible' : 'button--invisible'),
    [textsArrIndex]
  );

  return (
    <>
      <Page className="page">
        <Head>
          <title>Jengyoung&apos;s Portfolio 🙆🏻</title>
          <meta name="description" content="front-end developer portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container className="page__intro-copy">
          <Inner>
            {textsArr.map((text, index) => (
              <Catchphrase key={text.join('') + Date.now()}>
                {text[textsArrIndex[index].idx]}
              </Catchphrase>
            ))}
          </Inner>

          <Button className={buttonClassName}>
            <Link href="/about">CLICK</Link>
          </Button>
        </Container>
      </Page>

      <ForwardedCanvas
        width={windowState.innerWidth}
        height={windowState.innerHeight}
        ref={greetRef}
      />
    </>
  );
}

HomePage.getLayout = getIntroLayout;

export default HomePage;
