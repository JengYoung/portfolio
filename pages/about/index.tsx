import { css } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';
import { ScrollMouse } from '@components/Mouse';
import { CollapsedText } from '@components/Text';
import Gummy from '@components/Text/Gummy';

import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMetaball from '@hooks/useMetaball';
import useWindow from '@hooks/useWindow';

import globalTheme from '@styles/globalTheme';

import readonly from '@utils/readonly';
import throttle from '@utils/throttle';

interface FeatureInterface {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

interface HeaderStateInterface {
  rotate: number;
  origin: string;
  scale: number;
  opacity: number;
}

interface FeaturesHeaderTextInterface {
  x: number;
  y: string;
  value: string;
}

interface SkillInterface {
  name: string;
  src: string;
  checks: string[];
}

const ContainerCSS = css`
  position: relative;

  max-width: 1440px;
  height: 100vh;
  max-height: 1024px;
  margin: 0 auto;
  background-color: white;
`;

const Styled = {
  Page: styled.section`
    position: relative;
    width: 100vw;
    color: ${({ theme }) => theme.colors.subPrimary};
  `,
  Introduction: styled.section`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border: 0;
    ${ContainerCSS}
  `,
  IntroductionMainCopy: styled.h1`
    position: relative;
    top: 100px;

    z-index: 10;

    margin: 0;
    line-height: 1.5;

    ${({ theme }) => css`
      font-size: ${theme.heads[2].size};
      font-weight: ${theme.heads[2].weight};
    `}
  `,
  Name: styled.span`
    color: ${({ theme }) => theme.colors.primary.dark};
  `,

  Features: styled.section`
    ${ContainerCSS}

    box-sizing: border-box;
    width: 100%;
    height: auto;

    min-height: auto;
    max-height: auto;

    padding-top: 100px;
    background-color: white;
  `,
  FeatureHeader: styled.div`
    svg text {
      font-size: 5rem;
      font-weight: 900;

      fill: transparent;
      stroke: ${({ theme }) => theme.colors.primary.light};
      stroke-dasharray: 750;
      stroke-dashoffset: 750;
      stroke-width: 3px;

      animation: stroke 2s cubic-bezier(0.39, 0.575, 0.565, 1);
      animation-fill-mode: forwards;
    }

    @keyframes stroke {
      0% {
        stroke-dashoffset: 700;
      }
      70% {
        fill: ${({ theme }) => theme.colors.primary.light};
      }
      100% {
        fill: ${({ theme }) => theme.colors.primary.light};
        stroke-dashoffset: 0;
      }
    }
  `,
  FeaturesContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    height: 520px;
    padding: 10rem;

    overflow: hidden;
  `,
  FeatureContainer: styled.div`
    position: relative;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 270px;
    height: 270px;
  `,
  FeatureDetail: styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    padding-top: 1rem;
  `,
  FeatureHead: styled.h1`
    margin-bottom: 0.5rem;
    ${({ theme }) => css`
      font-size: ${theme.heads[4].size};
      font-weight: ${theme.heads[4].weight};
    `}
    color: black;
  `,
  Description: styled.span`
    text-align: center;

    ${({ theme }) => css`
      font-size: ${theme.fontSizes.l};
      word-break: keep-all;
    `}
  `,
  FeatureLines: styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  `,

  FeatureLine: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;

    border: 2px solid #fff;
    border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);

    opacity: 0.5;
    transition: all 1s;

    @keyframes rotatedBox1 {
      0% {
        transform: rotate(60deg);
      }
      100% {
        transform: rotate(420deg);
      }
    }
    @keyframes rotatedBox2 {
      0% {
        transform: rotate(480deg);
      }
      100% {
        transform: rotate(120deg);
      }
    }

    &:nth-of-type(1) {
      transform: rotate(60deg);
    }
    &:nth-of-type(2) {
      transform: rotate(120deg);
    }

    .feature__lines--rotate {
      &:nth-of-type(1) {
        animation: rotatedBox1 5s infinite linear;
      }
      &:nth-of-type(2) {
        animation: rotatedBox2 12s infinite linear;
      }
    }
  `,
  FeatureBackground: styled.div`
    position: absolute;

    width: 100%;
    height: 50%;

    background-color: ${({ theme }) => theme.colors.primary.light};

    transition: all 0.3s;

    &:first-of-type {
      top: 0;
      border-top: 2px solid ${({ theme }) => theme.colors.primary.light};
      animation: feature-move-right 2s ease-out;
    }
    &:last-of-type {
      bottom: 0;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
      animation: feature-move-left 2s ease-out;
    }

    @keyframes feature-move-left {
      0% {
        background-color: transparent;
        transform: translate(-100vw);
      }
      60% {
        background-color: transparent;
        transform: translate(0vw);
      }
    }

    @keyframes feature-move-right {
      0% {
        background-color: transparent;
        transform: translate(100vw);
      }
      60% {
        background-color: transparent;
        transform: translate(0vw);
      }
    }
  `,

  SkillSection: styled.section`
    position: relative;
    ${ContainerCSS}
  `,
  SkllContainer: styled.div`
    width: 100%;
    /* height: ${({ theme }) => css`calc(100% - ${theme.heads[1].size} * 4)`}; */
    overflow: hidden;
  `,
  SkillHeader: styled.header<{ headerState: HeaderStateInterface }>`
    position: absolute;
    top: 0;
    line-height: 1;
    transition: all 0.2s;
    ${({ theme, headerState }) => css`
      font-size: calc(${theme.heads[1].size} * 4);
      font-weight: ${theme.heads[1].weight};
      color: ${theme.colors.primary.light};
      letter-spacing: -1rem;
      opacity: ${headerState.opacity};
      transform: rotate(${headerState.rotate}deg) scale(${headerState.scale});
      transform-origin: left;
    `}
  `,
  Skills: styled.ul`
    position: absolute;
    right: 0;
    bottom: 1.5rem;
    left: 0;
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 0 1rem;
    margin: 0 7.5rem;
    background-color: rgba(0, 0, 0, 0.58);
    border-radius: 20px;
  `,
  SkillContainer: styled.li`
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
  `,
  ImageContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    padding: 0.5rem;
    overflow: hidden;
    background-color: rgba(256, 256, 256, 0.8);
    /* border: 1px solid white; */
    border-radius: 20px;
  `,
  Separator: styled.div`
    width: 1px;
    height: 4rem;
    padding: 1rem 0;
    margin-right: 1rem;
    ${({ theme }) => css`
      background-color: ${theme.colors.white};
    `}
  `,
};

function AboutPage() {
  const { windowState } = useWindow(['innerWidth', 'innerHeight']);
  const minWidth = useMemo(
    () => Math.min(1440, windowState.innerWidth ?? 0),
    [windowState.innerWidth]
  );

  const minHeight = useMemo(
    () => Math.min(1024, windowState.innerHeight ?? 0),
    [windowState.innerHeight]
  );

  const initialGradientColors: GradientType = ['#fff', '#fff'];
  const metaballGradientColors: GradientType = [
    globalTheme.colors.primary.dark,
    globalTheme.colors.primary.light,
  ];

  const canvasRef = useRef(null);
  useMetaball({
    canvasRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: minWidth / 2,
      y: minHeight / 2 + 100,
      r: 150,
    },
    staticBubbles: [
      {
        x: minWidth * 0.1,
        y: minHeight * 0.1,
        r: 200,
        to: {
          x: minWidth * 0.1,
          y: minHeight * 0.1,
        },
        v: [0, 0],
      },

      {
        x: minWidth * 0.9,
        y: minHeight * 0.7,
        r: 200,
        to: {
          x: minWidth * 0.9,
          y: minHeight * 0.7,
        },
        v: [0, 0],
      },

      {
        x: minWidth * 0.15,
        y: minHeight * 0.8,
        r: 110,
        to: {
          x: minWidth * 0.15,
          y: minHeight * 0.8,
        },
        v: [0, 0],
      },

      {
        x: minWidth * 0.8,
        y: minHeight * 0.3,
        r: 50,
        to: {
          x: minWidth * 0.8,
          y: minHeight * 0.3,
        },
        v: [0, 0],
      },

      {
        x: minWidth * 0.7,
        y: minHeight * 0.05,
        r: 30,
        to: {
          x: minWidth * 0.4,
          y: minHeight * 0.05,
        },
        v: [1, 0.2],
      },

      {
        x: minWidth * 0.9,
        y: minHeight * -0.2,
        r: 300,
        to: {
          x: minWidth * 0.9,
          y: minHeight * -0.2,
        },
        v: [1, 0.2],
      },
    ],
    options: {
      bubbleNum: 4,
      absorbBallNum: 3,
      canvasWidth: windowState.innerWidth,
      canvasHeight: minHeight,
    },
  });

  const featuresHeaderTexts: FeaturesHeaderTextInterface[] = [
    {
      x: 0,
      y: '100%',
      value: 'F',
    },
    {
      x: 42.5,
      y: '100%',
      value: 'E',
    },
    {
      x: 90,
      y: '100%',
      value: 'A',
    },
    {
      x: 135,
      y: '100%',
      value: 'T',
    },
    {
      x: 182.5,
      y: '100%',
      value: 'U',
    },
    {
      x: 235,
      y: '100%',
      value: 'R',
    },
    {
      x: 285,
      y: '100%',
      value: 'E',
    },
    {
      x: 330,
      y: '100%',
      value: 'S',
    },
  ];

  const features: FeatureInterface[] = readonly([
    {
      id: 0,
      emoji: '💡',
      title: '호기심',
      description: '항상 새로운 것들에 호기심을 갖고, 기존과 비교하며 개선해나가요 😉',
    },
    {
      id: 1,
      emoji: '📝',
      title: '문서화',
      description: '모르는 것들을 찾으면, 기록하며 배워나가는 습관을 갖고 있어요 🥸',
    },
    {
      id: 2,
      emoji: '🏄‍♂️',
      title: '꾸준함',
      description: '현재에 안주하지 않아요. 항상 더 나은 방향으로 성장하는 것을 즐겨요 🥰',
    },
  ]);

  const skillHeaderRef = useRef<HTMLHeadElement>(null);
  const [headerState, setHeaderState] = useState({
    isActive: false,
    y: 0,
    rotate: 0,
    scale: 1,
    origin: 'center',
    opacity: 0.3,
  });

  const skillHeaderCallback = useRef<IntersectionObserverCallback>((entries) => {
    entries.forEach((entry) => {
      setHeaderState((state) => ({
        ...state,
        isActive: entry.isIntersecting,
      }));
    });
  });

  useIntersectionObserver(skillHeaderRef, skillHeaderCallback, {
    rootMargin: '-200px',
  });

  useEffect(() => {
    const { clientHeight } = document.body;
    if (headerState.y === 0) {
      setHeaderState((state) => ({
        ...state,
        y: window.scrollY,
      }));
      return undefined;
    }

    const onScroll = throttle(() => {
      const { scrollY, innerHeight } = window;
      if (clientHeight + innerHeight <= scrollY) return;

      const diffScroll = scrollY - headerState.y;
      const diffRate = (400 - diffScroll) / 400;

      if (diffScroll < 400) {
        setHeaderState((state) => ({
          ...state,
          rotate: Math.min(diffRate * 15, 15),
          scale: Math.max(diffRate * 2, 0.7),
          origin: 'top left',
          opacity: Math.max(diffRate, 0.3),
        }));
        return;
      }
      setHeaderState((state) => ({
        ...state,
        rotate: 0,
        scale: 0.7,
        origin: 'top left',
        opacity: 0.3,
      }));
    }, 20);

    if (headerState.isActive) {
      window.addEventListener('scroll', onScroll);
    } else {
      window.removeEventListener('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headerState.isActive, headerState.y]);

  const Skills = {
    HTML5: 'HTML5',
    CSS3: 'CSS3',
    JavaScript: 'JavaScript',
    TypeScript: 'TypeScript',
    React: 'React',
    Vue3: 'Vue3',
    NextJS: 'NextJS',
    CSSInJS: 'CSS in JS',
    Storybook: 'Storybook',
    Quasar: 'Quasar',
    NodeJS: 'Node.js',
    AWS: 'AWS',
    YarnBerry: 'Yarn berry',
    CICD: 'CICD',
  } as const;

  const skills: SkillInterface[] = [
    {
      name: Skills.HTML5,
      src: '/html.png',
      checks: [
        '주요 태그들이 의미하는 특성을 이해하고 있어요.',
        '효율적으로 구조를 짜고, 시멘틱하게 작성할 수 있어요.',
        'HTML의 파싱과정을 이해하고 있어요.',
      ],
    },
    {
      name: Skills.CSS3,
      src: '/css3.png',
      checks: [
        'SCSS 구문을 사용할 수 있어요.',
        'CSS 개발 방법론(BEM, CMACSS, SMASS)를 알고 있어요.',
        'CSS 최적화의 중요성을 이해하고 리플로우를 최소화하려 노력해요.',
        'flex와 grid를 자유자재로 사용할 수 있어요.',
        '미디어 쿼리를 사용할 수 있어요.',
      ],
    },
    {
      name: Skills.JavaScript,
      src: '/javascript.png',
      checks: [
        'ECMAScript의 동향을 꾸준히 체크하고 있어요.',
        '문제가 주어지면 자바스크립트로 구현하는 데 익숙해요.',
        'this, 클로저, 실행 컨텍스트 등의 전반적인 자바스크립트 동작을 이해하고 있어요.',
      ],
    },
    {
      name: Skills.TypeScript,
      src: '/typescript.png',
      checks: [
        '프로젝트에서 타입스크립트를 다루는 데 어려움이 없어요.',
        '중복되는 인터페이스 구조 생성을 지양하고 타입의 재사용을 지향해요.',
        'any를 지양하며, type assertion을 남발하지 않아요.',
      ],
    },
    {
      name: Skills.React,
      src: '/react.png',
      checks: [
        '라이프사이클과 재조정 과정을 이해하고 있어요',
        '함수형 컴포넌트를 사용할 수 있어요',
        '커스텀 훅을 사용하여 재사용성을 높여요.',
        '전역 상태 관리의 원리를 이해하고 있어요.',
        'Redux를 사용할 수 있어요',
        '컴포넌트의 재사용을 지향하며 코드를 작성해요.',
      ],
    },
    {
      name: Skills.Vue3,
      src: '/vue3.png',
      checks: [
        'Vue의 라이프사이클을 이해하고 있어요.',
        'Vue2와 최신 Vue3의 문법을 이해하고 있어요.',
        '레거시 코드를 Vue3로 마이그레이션한 경험이 있어요.',
        'Composition API로 재사용 가능한 코드를 작성할 수 있어요.',
        'Vuex와 Pinia를 다룰 수 있어요.',
        '컴포넌트의 재사용을 지향하며 코드를 작성해요.',
      ],
    },
    {
      name: Skills.NextJS,
      src: '/nextjs.png',
      checks: [
        'CSR, SSR, SSG, ISR의 차이점을 이해하고 있어요.',
        'NextJS가 주는 여러 최적화를 다룰 수 있어요.',
      ],
    },
    {
      name: Skills.Quasar,
      src: '/quasar.svg',
      checks: [
        'Quasar가 주는 컴포넌트, CSS 기능들을 이해하고 있어요',
        'Quasar 기반 반응형 웹을 구축한 경험을 갖고 있어요.',
        'Icongenie 등을 다룰 수 있으며, 하이브리드 앱 유지 보수 경험이 있어요.',
      ],
    },
    {
      name: Skills.Storybook,
      src: '/storybook.png',
      checks: [
        'React와 Vue에서 모두 처음부터 구성하고 사용할 수 있어요.',
        'Control을 이용하여 테스트할 수 있는 스토리북을 만들어요.',
      ],
    },
    {
      name: Skills.NodeJS,
      src: '/nodejs.png',
      checks: [
        'Express.js와 Koa.js를 사용해본 경험이 있어요',
        'Node.js의 이벤트 루프를 이해하고 있어요.',
        'REST API로 클라이언트와 통신하는 서버를 만들 수 있어요.',
      ],
    },
    {
      name: Skills.AWS,
      src: '/aws.png',
      checks: [
        'S3를 이용하여 스토리지 사용 및 정적 웹사이트를 호스팅 및 배포할 수 있어요.',
        'CloudFront를 다룰 수 있어요.',
      ],
    },
    {
      name: Skills.CICD,
      src: '/github-actions.png',
      checks: [
        '클라이언트 훅과 서버 훅을 이해하고 있어요.',
        'Git hook을 기반으로 husky와 github-action을 다룰 수 있어요.',
        'AWS와 연동하여 배포 자동화를 할 수 있어요.',
      ],
    },
  ];

  return (
    <Styled.Page>
      <Styled.Introduction>
        <ForwardedCanvas width={minWidth} height={minHeight} ref={canvasRef} />
        <Styled.IntroductionMainCopy>
          <CollapsedText x={(windowState.innerWidth ?? 0) + 500} y={0} direction="LEFT">
            <Gummy texts="프론트엔드&nbsp;개발자" delay={1.5} />
          </CollapsedText>
        </Styled.IntroductionMainCopy>

        <Styled.IntroductionMainCopy>
          <CollapsedText x={-500} y={0} direction="RIGHT">
            <Styled.Name>
              <Gummy texts="황재영" delay={1.5} options={{ isGummy: true, infinite: true }} />
            </Styled.Name>
            <Gummy texts="입니다" delay={1.5} />
          </CollapsedText>
        </Styled.IntroductionMainCopy>
      </Styled.Introduction>
      <ScrollMouse bottom="1rem" delay={1.5} visible />

      <Styled.Features>
        <Styled.FeatureHeader>
          <svg width={600} height={100} viewBox="0 0 600 100">
            {featuresHeaderTexts.map((text) => (
              <text key={text.x} x={text.x} y={text.y}>
                {text.value}
              </text>
            ))}
          </svg>
        </Styled.FeatureHeader>

        <Styled.FeaturesContainer>
          <Styled.FeatureBackground />

          {features.map((feature) => (
            <Styled.FeatureContainer key={feature.id}>
              <Styled.FeatureDetail>
                <Styled.FeatureHead>{feature.emoji}</Styled.FeatureHead>
                <Styled.FeatureHead>{feature.title}</Styled.FeatureHead>
                <Styled.Description>{feature.description}</Styled.Description>
              </Styled.FeatureDetail>

              <Styled.FeatureLines>
                <Styled.FeatureLine />
                <Styled.FeatureLine />
                <Styled.FeatureLine />
              </Styled.FeatureLines>
            </Styled.FeatureContainer>
          ))}

          <Styled.FeatureBackground />
        </Styled.FeaturesContainer>
      </Styled.Features>

      <Styled.SkillSection>
        <Styled.SkllContainer />
        <Styled.SkillHeader ref={skillHeaderRef} headerState={headerState}>
          SKILLS
        </Styled.SkillHeader>
        <Styled.Skills>
          {skills.map((skill) => (
            <>
              <Styled.SkillContainer key={skill.name}>
                <Styled.ImageContainer>
                  <Image objectFit="contain" src={skill.src} alt="vercel" width="58" height="58" />
                </Styled.ImageContainer>
              </Styled.SkillContainer>
              {[Skills.TypeScript, Skills.Vue3, Skills.Quasar].some((v) => v === skill.name) && (
                <Styled.Separator />
              )}
            </>
          ))}
        </Styled.Skills>
      </Styled.SkillSection>
    </Styled.Page>
  );
}

export default AboutPage;
