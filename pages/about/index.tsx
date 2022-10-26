import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import Introduction from './Introduction';

import TransitionText from '@components/Text/TransitionText';
import { DynamicCanvas, Metaballs } from '@components/Metaball';

import { GradientType } from '@components/Metaball/types';
import useMetaball from '@hooks/useMetaball';
import { ForwardedCanvas } from '@components/Metaball/Canvas';

const Greet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

/** TODO:
 * @todo
 * [ ] 1. 메타볼 위치 조정
 * [ ] 2. 텍스트 포지션 바꾸기
 * [ ] 3. 이미지 넣기
 * [ ] 4. 이미지 렌더링 방식 생각하기
 * [ ] 5. 모바일 대응은 어떻게 할 것인지 고민하기.
 *
 * @description
 * 이는 지금 당장 위의 것들을 하지는 않을 것 같다. (너무 하나하나 디테일 잡고 가려니, 시간이 너무 걸리기 때문이다.)
 * MVP를 완성 후 손 볼 예정이다.
 */

const AboutPage = () => {
  const initialGradientColors: GradientType = ['#770084', '#ab0746'];
  const metaballGradientColors: GradientType = ['#9000ff', '#ff3dbb'];

  const [windowState, setWindowState] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }, []);

  const greetRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef: greetRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: windowState.width / 2,
      y: windowState.height / 2,
      r: 200,
    },
    options: {
      bubbleNum: 4,
      absorbBallNum: 5,
      canvasWidth: windowState.width,
      canvasHeight: windowState.height,
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

      {/* <>
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
      </> */}

      <ForwardedCanvas
        width={windowState.width}
        height={windowState.height}
        // canvasRef={greetRef}
        ref={greetRef}
      ></ForwardedCanvas>
    </>
  );
};

export default AboutPage;
