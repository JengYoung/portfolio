import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

import Introduction from './Introduction';

import TransitionText from '@components/Text/TransitionText';
import { DynamicCanvas, Metaballs } from '@components/Metaball';

import { GradientType } from '@components/Metaball/types';
import useMetaball from '@hooks/useMetaball';

const Greet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const AboutPage = () => {
  const initialGradientColors: GradientType = ['#770084', '#ab0746'];
  const metaballGradientColors: GradientType = ['#9000ff', '#ff3dbb'];

  const width = globalThis.innerWidth;
  const height = globalThis.innerHeight;

  const greetRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef: greetRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: width / 2,
      y: height / 2,
      r: 200,
    },
    options: {
      bubbleNum: 4,
      absorbBallNum: 5,
      canvasWidth: width,
      canvasHeight: height,
    },
  });

  return (
    <>
      <Greet>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          안녕하세요! 🖐🏻
        </TransitionText>
        <TransitionText $delay={1} $size="xl">
          웹 프론트엔드 개발자
        </TransitionText>
        <TransitionText $pending={1000} $delay={1} $size="xl">
          <strong>황재영</strong>입니다.
        </TransitionText>
      </Greet>

      <>
        <Introduction.Maticulous
          width={width}
          height={Math.max(1000, height)}
        ></Introduction.Maticulous>
        <Introduction.Documentation
          width={width}
          height={Math.max(1000, height)}
        ></Introduction.Documentation>
        <Introduction.Curious
          width={width}
          height={Math.max(1000, height)}
        ></Introduction.Curious>
      </>

      <DynamicCanvas
        width={width}
        height={height}
        canvasRef={greetRef}
        ref={greetRef}
      ></DynamicCanvas>
    </>
  );
};

export default AboutPage;
