import { css } from '@emotion/react';
import React, { useMemo, useRef } from 'react';

import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';
import { ScrollMouse } from '@components/Mouse';
import { CollapsedText } from '@components/Text';
import Gummy from '@components/Text/Gummy';

import useMetaball from '@hooks/useMetaball';
import useWindow from '@hooks/useWindow';

import globalTheme from '@styles/globalTheme';

const ContainerCSS = css`
  position: relative;

  max-width: 1440px;
  height: 100vh;
  max-height: 1024px;
  margin: 0 auto;
`;

const Styled = {
  Page: styled.section`
    position: relative;
    width: 100vw;
    height: auto;
    color: ${({ theme }) => theme.colors.subPrimary};
  `,
  Introduction: styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${ContainerCSS}
  `,
  IntroductionMainCopy: styled.h1`
    position: relative;
    top: 100px;
    margin: 0;
    line-height: 1.5;

    ${({ theme }) => css`
      font-size: ${theme.heads[2].size};
      font-weight: ${theme.heads[2].weight};
    `}
  `,
  Name: styled.span`
    color: ${({ theme }) => theme.colors.primary.dark} !important;
  `,

  Features: styled.section`
    ${ContainerCSS}
    box-sizing: border-box;
    width: 100%;
    height: 520px;
    background-color: white;
  `,
  FeaturesTitle: styled.div`
    svg text {
      font-family: 'Anton', sans-serif;
      font-size: 5rem;
      fill: transparent;
      stroke: ${({ theme }) => theme.colors.primary.light};
      stroke-dasharray: 750;
      stroke-dashoffset: 750;
      stroke-width: 3px;
      animation: stroke 3.5s linear;
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
  FeaturesDetailContainer: styled.div`
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    perspective: 100vw;
  `,
  FeaturesDetailInner: styled.div`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary.light};
    transition: all 3s;
    transform-origin: center;
    animation: test 3s infinite ease;
    @keyframes test {
      0% {
        transform: translate(-100vw, 0.125rem) rotateX(90deg);
        transform-origin: top;
      }
      50% {
        transform: translate(0, 0.125rem) rotateX(90deg);
        transform-origin: top;
      }
    }
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

  return (
    <Styled.Page>
      <Styled.Introduction>
        <CollapsedText x={(windowState.innerWidth ?? 0) + 500} y={0} direction="LEFT">
          <Styled.IntroductionMainCopy>
            <Gummy texts="프론트엔드&nbsp;개발자" delay={1.5} />
          </Styled.IntroductionMainCopy>
        </CollapsedText>

        <CollapsedText x={-500} y={0} direction="RIGHT">
          <Styled.IntroductionMainCopy>
            <Styled.Name>
              <Gummy texts="황재영" delay={1.5} options={{ isGummy: true, infinite: true }} />
            </Styled.Name>
            <Gummy texts="입니다" delay={1.5} />
          </Styled.IntroductionMainCopy>
        </CollapsedText>

        <ForwardedCanvas width={minWidth} height={minHeight} ref={canvasRef} />
        <ScrollMouse bottom="1rem" delay={1.5} visible />
      </Styled.Introduction>
      <Styled.Features>
        <Styled.FeaturesTitle>
          <svg width={600} height={100} viewBox="0 0 600 100">
            <text x="0" y="100%">
              F
            </text>
            <text x="45" y="100%">
              E
            </text>
            <text x="90" y="100%">
              A
            </text>
            <text x="135" y="100%">
              T
            </text>
            <text x="180" y="100%">
              U
            </text>
            <text x="230" y="100%">
              R
            </text>
            <text x="275" y="100%">
              E
            </text>
            <text x="320" y="100%">
              S
            </text>
          </svg>
        </Styled.FeaturesTitle>
        <Styled.FeaturesDetailContainer>
          <Styled.FeaturesDetailInner />
        </Styled.FeaturesDetailContainer>
      </Styled.Features>
    </Styled.Page>
  );
}

export default AboutPage;
