import { css } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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

import throttle from '@utils/throttle';

interface HeaderStateInterface {
  rotate: number;
  origin: string;
  scale: number;
  opacity: number;
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
    height: ${({ theme }) => css`calc(100% - ${theme.heads[1].size} * 4)`};
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
      if (entry.isIntersecting) {
        setHeaderState((state) => ({
          ...state,
          isActive: true,
        }));
      } else {
        setHeaderState((state) => ({
          ...state,
          isActive: false,
        }));
      }
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

        <ScrollMouse bottom="1rem" delay={1.5} visible />
      </Styled.Introduction>

      <Styled.Features>
        <Styled.FeatureHeader>
          <svg width={600} height={100} viewBox="0 0 600 100">
            <text x="0" y="100%">
              F
            </text>
            <text x="42.5" y="100%">
              E
            </text>
            <text x="90" y="100%">
              A
            </text>
            <text x="135" y="100%">
              T
            </text>
            <text x="182.5" y="100%">
              U
            </text>
            <text x="235" y="100%">
              R
            </text>
            <text x="285" y="100%">
              E
            </text>
            <text x="330" y="100%">
              S
            </text>
          </svg>
        </Styled.FeatureHeader>

        <Styled.FeaturesContainer>
          <Styled.FeatureBackground />

          <Styled.FeatureContainer>
            <Styled.FeatureDetail>
              <Styled.FeatureHead>💡</Styled.FeatureHead>
              <Styled.FeatureHead>호기심</Styled.FeatureHead>
              <Styled.Description>
                항상 새로운 것들에 호기심을 갖고, 기존과 비교하며 개선해나가요 😉
              </Styled.Description>
            </Styled.FeatureDetail>

            <Styled.FeatureLines>
              <Styled.FeatureLine />
              <Styled.FeatureLine />
              <Styled.FeatureLine />
            </Styled.FeatureLines>
          </Styled.FeatureContainer>

          <Styled.FeatureContainer>
            <Styled.FeatureDetail>
              <Styled.FeatureHead>📝</Styled.FeatureHead>
              <Styled.FeatureHead>문서화</Styled.FeatureHead>
              <Styled.Description>
                모르는 것들을 찾으면, 기록하며 배워나가는 습관을 갖고 있어요 🥸
              </Styled.Description>
            </Styled.FeatureDetail>
            <Styled.FeatureLines>
              <Styled.FeatureLine />
              <Styled.FeatureLine />
              <Styled.FeatureLine />
            </Styled.FeatureLines>
          </Styled.FeatureContainer>

          <Styled.FeatureContainer>
            <Styled.FeatureDetail>
              <Styled.FeatureHead>🏄‍♂️</Styled.FeatureHead>
              <Styled.FeatureHead>꾸준함</Styled.FeatureHead>
              <Styled.Description>
                현재에 안주하지 않아요. 항상 더 나은 방향으로 성장하는 것을 즐겨요 🥰
              </Styled.Description>
            </Styled.FeatureDetail>
            <Styled.FeatureLines>
              <Styled.FeatureLine />
              <Styled.FeatureLine />
              <Styled.FeatureLine />
            </Styled.FeatureLines>
          </Styled.FeatureContainer>

          <Styled.FeatureBackground />
        </Styled.FeaturesContainer>
      </Styled.Features>

      <Styled.SkillSection>
        <Styled.SkllContainer />
        <Styled.SkillHeader ref={skillHeaderRef} headerState={headerState}>
          SKILLS
        </Styled.SkillHeader>
      </Styled.SkillSection>
    </Styled.Page>
  );
}

export default AboutPage;
