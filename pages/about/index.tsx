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
    padding-top: 100px;
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
  FeaturesDetailContainer: styled.div`
    position: relative;

    width: 100%;
    height: 520px;

    overflow: hidden;

    perspective: 100vw;
  `,

  FeatureBackground: styled.div`
    position: absolute;

    width: 100%;
    height: 50%;

    background-color: ${({ theme }) => theme.colors.primary.light};

    transition: all 0.3s;

    &:first-of-type {
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
          <Styled.FeatureBackground />
          <Styled.FeatureBackground />
        </Styled.FeaturesDetailContainer>
      </Styled.Features>
      <Styled.Introduction />
    </Styled.Page>
  );
}

export default AboutPage;
