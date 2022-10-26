import { DynamicCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';
import TextStyle from '@components/Text';
import TransitionText from '@components/Text/TransitionText';
import styled from '@emotion/styled';
import useMetaball from '@hooks/useMetaball';
import React, { useRef } from 'react';

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

enum IntroductionEnum {
  Maticulous,
  Documentation,
  Curious,
}

const getGradientColors = (key: string): [GradientType, GradientType] => {
  const bgGradients = ['#ab0746', '#943bc3', '#390fa3', '#16083e'];
  const metaballGradients = ['#ff3dbb', '#ffb151', '#ffbeb5', '#ffbf00'];
  const index = Object.keys(Introduction).indexOf(key);

  return [
    [bgGradients[index], bgGradients[index + 1]],
    [metaballGradients[index], metaballGradients[index + 1]],
  ];
};

const Maticulous = ({ width, height }: { width: number; height: number }) => {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(
    IntroductionEnum[0]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef: canvasRef,
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
      <DynamicCanvas
        width={width}
        height={height}
        ref={canvasRef}
        canvasRef={canvasRef}
      ></DynamicCanvas>

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
};

const Documentation = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(
    IntroductionEnum[1]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef: canvasRef,
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
      <DynamicCanvas
        width={width}
        height={height}
        ref={canvasRef}
        canvasRef={canvasRef}
      ></DynamicCanvas>

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
};

const Curious = ({ width, height }: { width: number; height: number }) => {
  const [initialGradientColors, metaballGradientColors] = getGradientColors(
    IntroductionEnum[2]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useMetaball({
    canvasRef: canvasRef,
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
      <DynamicCanvas
        width={width}
        height={height}
        ref={canvasRef}
        canvasRef={canvasRef}
      ></DynamicCanvas>

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
};

/**
 * @description
 * Introduction이라는 말도 전체를 다 표현하지 못한다는 생각에 이런 식으로 작성했다.
 * 이것이 Introduction을 위한 하위 컴포넌트임을 분명히 하기 위해 몇 시간을 고민한 끝에, 약간 DOM보다 좀 더 upgrade된 방법을 사용했다.
 * 어쩌면 누군가는 욕할 수 있겠지만, 이게 좀 더 깔끔하게 관리하는 듯하다 나는.
 */
const Introduction = {
  Maticulous,
  Documentation,
  Curious,
};

/**
 * @exports
 *
 * 이 방식이 좀 의아할 수 있다. 헷갈릴 미래의 나를 위해 문서를 남겨둔다.
 *
 * - 배경
 * 내가 이렇게 pages라는 파일 라우팅 시스템 안에 다른 모듈을 넣은 것은 분명 좋지 않은 방법일 수 있다.
 * 그러나, 나는 다르게 생각한다.
 *
 * 한 페이지에 의미가 있는 것을 다 넣으면 좋겠지만, Organism들에 대한 의미를 제대로 전달하지 못하는 단점도 분명 존재한다.
 * 그렇다고 한 모듈 안에 넣는 것은 꽤나 엔트리에 대한 집중도를 떨어뜨리는 산만한 일이라 생각했고, components에 Atomic Design System을 혼용하는 건 더 awkward한 느낌도 들었다.
 *
 * 따라서, 따로 이렇게 `pages`에 넣는 일이 파일 라우팅에 큰 영향을 미치지 않는다고 판단하여, 다음과 같은 방법을 채택했다.
 *
 * 1. Next의 방식에 맞게 index.tsx가 페이지에 들어갈 소스들을 다 합쳐서 내보낸다.
 * 2. 기타 템플릿들은 지금처럼 같은 디렉토리 안의 형제 모듈로 분리하여 이름을 지정해줌으로써, 더 명확하게 알 수 있도록 한다.
 *
 * expected:
 * 이렇게 관리하면 기대되는 장점은, 한 페이지에서 전체 코드를 다 볼 수 있다는 장점이 생겨, 필요한 부분만 빠르게 찾아낼 수 있다.
 * 또한, pages의 같은 형제 모듈에서 처리하니까 응집도의 체감도 그렇게 낮지 않다는 느낌이 든다.
 * 다만, 이 방법이 좋지 않다 판단할 때는 바로 리팩토링하자.
 */
export default Introduction;
