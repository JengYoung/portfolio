import React, { useRef } from 'react';

import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';
import TextStyle from '@components/Text';
import TransitionText from '@components/Text/TransitionText';
import { getBaseLayout } from '@components/layouts';

import useMetaball from '@hooks/useMetaball';
import useWindow from '@hooks/useWindow';

/* eslint-disable @typescript-eslint/no-shadow */
enum IntroductionEnum {
  Maticulous,
  Documentation,
  Curious,
}

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

const Styled = {
  Introduction: styled.section`
    position: relative;
    height: 1000px;
    opacity: 1;
  `,
  TextContainer: styled.div`
    position: relative;
    transform: translate3d(100px, 300px, 0);
  `,
};

/**
 * @description
 * Introduction이라는 말도 전체를 다 표현하지 못한다는 생각에 이런 식으로 작성했다.
 * 이것이 Introduction을 위한 하위 컴포넌트임을 분명히 하기 위해 사용했다.
 *
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
const Introduction = {
  Maticulous,
  Documentation,
  Curious,
};

const getGradientColors = (key: string): [GradientType, GradientType] => {
  const bgGradients = ['#ab0746', '#943bc3', '#390fa3', '#16083e'];
  const metaballGradients = ['#ff3dbb', '#ffb151', '#ffbeb5', '#ffbf00'];

  const index = Object.keys(Introduction).indexOf(key);

  return [
    [bgGradients[index], bgGradients[index + 1]],
    [metaballGradients[index], metaballGradients[index + 1]],
  ];
};

function Maticulous({ width, height }: { width: number; height: number }) {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(IntroductionEnum[0]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: (width / 100) * 90,
      y: (height / 100) * 25,
      r: 200,
    },
    staticBubbles: [
      {
        x: (width / 100) * 90,
        y: (height / 100) * 25,
        r: 300,
        v: [-14, 14.2],
        to: {
          x: (width / 100) * 90 - 400,
          y: (height / 100) * 25 + 400,
        },
      },
    ],
    options: {
      bubbleNum: 0,
      absorbBallNum: 0,
      canvasWidth: width,
      canvasHeight: height,
    },
  });

  return (
    <Styled.Introduction>
      <ForwardedCanvas width={width} height={height} ref={canvasRef} />

      <Styled.TextContainer>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <div>코드에는</div>
            <strong>이야기</strong>가 있다고 믿어요
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>개발을 하는 모든 과정 자체를</div>
            <div>유저와 동료에게 이야기한다고 생각해요.</div>
            <div>사소한 UX 오류라도 개선하려 노력하며</div>
            <div>주석 하나라도 애정을 담아 작성해요.</div>
            <div>유저에게도, 동료에게도 좋은 이야기만 들려주고 싶은</div>
            <div>개발자이자 이야기꾼입니다.</div>
          </TextStyle.Default>
        </TransitionText>
      </Styled.TextContainer>
    </Styled.Introduction>
  );
}

function Documentation({ width, height }: { width: number; height: number }) {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(IntroductionEnum[1]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: (width / 100) * 90,
      y: (height / 100) * 25,
      r: 200,
    },
    staticBubbles: [
      {
        x: (width / 100) * 90,
        y: (height / 100) * 25,
        r: 300,
        v: [-14, 14.2],
        to: {
          x: (width / 100) * 90 - 400,
          y: (height / 100) * 25 + 400,
        },
      },
    ],
    options: {
      bubbleNum: 0,
      absorbBallNum: 0,
      canvasWidth: width,
      canvasHeight: height,
    },
  });

  return (
    <Styled.Introduction>
      <ForwardedCanvas width={width} height={height} ref={canvasRef} />

      <Styled.TextContainer>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <strong>문서화</strong>를 지향해요
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>아무리 좋은 이야기라도</div>
            <div>줄거리 요약보다 이해하기 빠를 수 없다 생각해요.</div>
            <div>제가 구현했던, 생각했던 모든 과정들을</div>
            <div>기록으로 남겨놓아요.</div>
          </TextStyle.Default>
        </TransitionText>
      </Styled.TextContainer>
    </Styled.Introduction>
  );
}

function Curious({ width, height }: { width: number; height: number }) {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(IntroductionEnum[2]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: (width / 100) * 90,
      y: (height / 100) * 25,
      r: 200,
    },
    staticBubbles: [
      {
        x: (width / 100) * 90,
        y: (height / 100) * 25,
        r: 300,
        v: [-14, 14.2],
        to: {
          x: (width / 100) * 90 - 400,
          y: (height / 100) * 25 + 400,
        },
      },
    ],
    options: {
      bubbleNum: 0,
      absorbBallNum: 0,
      canvasWidth: width,
      canvasHeight: height,
    },
  });

  return (
    <Styled.Introduction>
      <ForwardedCanvas width={width} height={height} ref={canvasRef} />

      <Styled.TextContainer>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <strong>호기심</strong>이 많아요
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>재밌는 것을 보면 따라해요!</div>
            <div>물론 막히면 스트레스를 엄~청 많이 받지만</div>
            <div>구현했을 때 짜릿함 하나만으로도</div>
            <div>개발을 좋아하는 개발자입니다.</div>
          </TextStyle.Default>
        </TransitionText>
      </Styled.TextContainer>
    </Styled.Introduction>
  );
}

function AboutPage() {
  const initialGradientColors: GradientType = ['#770084', '#ab0746'];
  const metaballGradientColors: GradientType = ['#9000ff', '#ff3dbb'];

  const { windowState } = useWindow(['innerWidth', 'innerHeight']);

  const greetRef = useRef<HTMLCanvasElement | null>(null);

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

  return (
    <>
      <Introduction.Maticulous
        width={windowState.innerWidth}
        height={Math.max(1000, windowState.innerHeight)}
      />
      <Introduction.Documentation
        width={windowState.innerWidth}
        height={Math.max(1000, windowState.innerHeight)}
      />
      <Introduction.Curious
        width={windowState.innerWidth}
        height={Math.max(1000, windowState.innerHeight)}
      />
    </>
  );
}

AboutPage.getLayout = getBaseLayout;

export default AboutPage;
