import styled from '@emotion/styled';
import React, { useRef } from 'react';

import Introduction from './Introduction';
import { GradientType } from '@components/Metaball/types';

import useMetaball from '@hooks/useMetaball';
import useWindow from '@hooks/useWindow';

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

  const { windowState } = useWindow();

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
      <Introduction.Maticulous
        width={windowState.width}
        height={Math.max(1000, windowState.height)}
      ></Introduction.Maticulous>
      <Introduction.Documentation
        width={windowState.width}
        height={Math.max(1000, windowState.height)}
      ></Introduction.Documentation>
      <Introduction.Curious
        width={windowState.width}
        height={Math.max(1000, windowState.height)}
      ></Introduction.Curious>
    </>
  );
};

export default AboutPage;
