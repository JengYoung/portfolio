import React, { useEffect, useMemo, useRef, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';
import { ScrollMouse } from '@components/Mouse';
import { CollapsedText } from '@components/Text';
import Gummy from '@components/Text/Gummy';
import { getBaseLayout } from '@components/layouts';

import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMetaball from '@hooks/useMetaball';
import useResize from '@hooks/useResize';

import featuresData from '@assets/dataset/features.json';
import skillsData from '@assets/dataset/skills.json';

import { CustomTheme } from '@styles/globalTheme';
import { strokeTextLine } from '@styles/keyframes/strokeLine';

import { getMainMetaball } from '@utils/metaballs/getMainMetaball';
import getStaticBubbles from '@utils/metaballs/getStaticBubbles';
import readonly from '@utils/readonly';
import getFeatureText from '@utils/svgs/getFeatureText';
import throttle from '@utils/throttle';
import { isMobileSize } from '@utils/viewports';

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
  id: number;
  name: string;
  src: string;
  checks: string[];
}

const ContainerCSS = (theme: CustomTheme) => css`
  position: relative;

  max-width: 1440px;
  height: 100vh;
  max-height: 1024px;
  margin: 0 auto;

  overflow: hidden;

  background-color: ${theme.pages.about.bg};

  @media screen and (max-width: ${theme.viewPort.tabletMax}) {
    width: 100%;
    max-width: 100%;
  }
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
    ${({ theme }) => ContainerCSS(theme)};
  `,
  CopyBox: styled.section`
    margin-top: 3.125rem;

    color: ${({ theme }) => theme.colors.font};
    text-align: center;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: 100%;
        max-width: 100%;
        margin-top: 20%;
      }
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        width: 100%;
        max-width: 100%;
        margin-top: 120px;
      }
    `}
  `,
  IntroductionMainCopy: styled.h1`
    position: relative;

    z-index: 10;

    margin: 0;

    ${({ theme }) => css`
      font-size: ${theme.heads[2].size};
      font-weight: ${theme.heads[2].weight};
    `}
  `,
  IntroductionSubCopy: styled.h1`
    position: relative;
    top: 1rem;
    z-index: 10;
    margin: 0;
    line-height: 1.5;
    text-align: center;

    ${({ theme }) => css`
      font-size: ${theme.fontSizes.l};
      font-weight: ${theme.fontWeights.default};
    `}
  `,
  ProfileImage: styled.img<{ top: number; size: number }>`
    position: absolute;
    top: ${({ top }) => top}px;

    z-index: 10;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;

    border-radius: 50%;
  `,
  Name: styled.span`
    color: ${({ theme }) => theme.pages.about.name};
  `,

  Features: styled.section`
    ${({ theme }) => ContainerCSS(theme)}

    box-sizing: border-box;
    width: 100%;
    height: auto;

    min-height: auto;
    max-height: auto;

    padding-top: 100px;

    background-color: ${({ theme }) => theme.pages.about.bg};

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        padding-top: 0px;
      }
    `}
  `,
  FeatureHeader: styled.div`
    display: flex;
    align-items: flex-end;

    svg text {
      ${({ theme }) => css`
        @media screen and (max-width: ${theme.viewPort.tabletMax}) {
          font-size: 8rem;
        }
        @media screen and (max-width: ${theme.viewPort.mobileMax}) {
          font-size: 5rem;
        }
      `}
      font-size: 5rem;
      font-weight: 900;

      fill: ${({ theme }) => theme.colors.primary.light};
      stroke: ${({ theme }) => theme.colors.primary.light};
      stroke-dasharray: 750;
      stroke-dashoffset: 750;
      stroke-width: 3px;

      animation: ${({ theme }) => strokeTextLine(theme)} 2s cubic-bezier(0.39, 0.575, 0.565, 1);
      animation-fill-mode: forwards;
    }
  `,
  FeaturesContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    height: 520px;
    padding: 10rem 0;

    overflow: hidden;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        padding: 5rem 0;
      }

      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        flex-direction: column;
      }
    `}
  `,
  FeatureContainer: styled.div`
    position: relative;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 270px;
    height: 270px;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: 150px;
        height: 150px;
        margin: 10px;
      }
    `}
  `,
  FeatureDetail: styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: 150px;
        height: 150px;
        margin: 10px;
      }
    `}
  `,
  FeatureHead: styled.h1`
    margin-bottom: 0.5rem;
    ${({ theme }) => css`
      font-size: ${theme.heads[4].size};
      font-weight: ${theme.heads[4].weight};
      color: ${theme.colors.font};

      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        font-size: ${theme.fontSizes.xxl};
        font-weight: ${theme.fontWeights.bold};
      }
    `}
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.colors.font};
    text-align: center;

    ${({ theme }) => css`
      font-size: ${theme.fontSizes.l};
      word-break: keep-all;

      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        font-size: ${theme.fontSizes.default};
        font-weight: ${theme.fontWeights.default};
      }
    `}
  `,
  FeatureLines: styled.div`
    position: absolute;
    width: 270px;
    height: 270px;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        width: 25vw;
        min-width: 150px;
        max-width: 270px;

        height: 25vw;
        min-height: 150px;
        max-height: 270px;
      }
    `}
  `,

  FeatureLine: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.pages.about.featureLine};

    border: 2px solid ${({ theme }) => theme.pages.about.featureLine};
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
    align-items: center;
    overflow: hidden;
    ${({ theme }) => ContainerCSS(theme)}
  `,
  SkllContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
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

  NowSkillImageContainer: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 600px;
    height: 600px;
    transform: rotate(-30deg);

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        position: relative;
        right: auto;
        width: 30vh;
        height: 30vh;
        margin: 0 auto;
        transform: rotate(0deg);
      }
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: 30vh;
        height: 30vh;
      }
    `}
  `,
  NowSkillDetailContainer: styled.section`
    position: relative;
    flex-direction: column;
    padding: 5rem;
    margin-top: 5rem;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        align-items: center;
        justify-content: center;
      }
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
  `,
  NowSkillImageName: styled.div`
    position: relative;
    z-index: 1;

    width: 100%;

    margin: 0;
    line-height: 1.5;

    ${({ theme }) => css`
      font-size: calc(${theme.heads[1].size} * 2);
      font-weight: ${theme.heads[1].weight};
      color: ${theme.colors.font};
      text-shadow: 5px 5px ${theme.colors.primary.light};

      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        font-size: calc(${theme.heads[1].size} * 1.5);
        font-weight: ${theme.heads[1].weight};
        text-align: center;
      }
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        margin: 1rem 0;
        font-size: calc(${theme.heads[2].size});
        font-weight: ${theme.heads[1].weight};
        text-shadow: 2px 2px ${theme.colors.primary.light};
      }
    `}
  `,
  NowSkillDescriptions: styled.ul`
    position: relative;
    z-index: 20;
    margin-top: 1rem;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5rem;
        text-align: center;
      }
    `}
  `,
  NowSkillDescription: styled.li`
    ${({ theme }) => css`
      margin-bottom: 0.5rem;
      font-size: ${theme.fontSizes.l};
      font-weight: ${theme.fontWeights.default};
      color: ${theme.colors.font};

      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        width: 60vw;
        margin-bottom: 0.5rem;
        font-size: ${theme.fontSizes.l};
        word-break: keep-all;
      }

      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        font-size: ${theme.fontSizes.l};
      }
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
    margin: 0 5vw;
    overflow-x: scroll;
    background-color: rgba(0, 0, 0, 0.58);
    border-radius: 20px;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        border-radius: 10px;
      }
    `}
  `,
  SkillContainer: styled.li`
    display: flex;
    justify-content: center;
    height: 100%;
    margin-right: 1rem;
  `,
  Skill: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,

  ImageContainer: styled.div`
    display: flex;
    /* flex-shrink: 0; */
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    background-color: rgba(256, 256, 256, 0.8);
    border-radius: 20px;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        border-radius: 12px;
      }
    `}

    &:hover {
      animation: element-jump 1s infinite;
      @keyframes element-jump {
        0% {
          transform: scaleX(1) scaleY(1);
        }
        20% {
          transform: scaleX(1.2) scaleY(0.8);
        }
        40% {
          transform: scaleX(0.9) scaleY(1.1) translateY(-0.5rem);
        }
        60% {
          transform: scaleX(1.05) scaleY(0.95) translateY(0);
        }
        80% {
          transform: scaleX(0.97) scaleY(1.03);
        }
        100% {
          transform: scaleX(1) scaleY(1);
        }
      }
    }
  `,
  ActiveDot: styled.div`
    position: absolute;
    bottom: 2px;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
  `,

  Separator: styled.div`
    width: 1px;
    margin: 1rem 0;
    margin-left: 1rem;
    ${({ theme }) => css`
      background-color: ${theme.colors.white};
    `}
  `,

  MouseContainer: styled.div`
    position: relative;
    z-index: 11;
    display: flex;
    justify-content: center;
  `,
};

function AboutPage() {
  const theme = useTheme();

  const [isMouseVisible, setIsMouseVisible] = useState(true);

  const { windowState } = useResize();

  const minWidth = useMemo(
    () => Math.min(1440, windowState.innerWidth ?? 0),
    [windowState.innerWidth]
  );

  const minHeight = useMemo(
    () => Math.min(1024, windowState.innerHeight ?? 0),
    [windowState.innerHeight]
  );

  const initialGradientColors: GradientType = [theme.pages.about.bg, theme.pages.about.bg];

  const metaballGradientColors: GradientType = [
    theme.colors.primary.dark,
    theme.colors.primary.light,
  ];

  const canvasRef = useRef(null);

  useMetaball({
    canvasRef,
    baseFillColor: theme.colors.canvasBackground,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: getMainMetaball(minWidth, minHeight),
    staticBubbles: getStaticBubbles(minWidth, minHeight),
    options: {
      bubbleNum: 4,
      absorbBallNum: isMobileSize(minWidth) ? 0 : 3,
      canvasWidth: minWidth,
      canvasHeight: minHeight,
    },
  });

  const featuresHeaderTexts: FeaturesHeaderTextInterface[] = getFeatureText(minWidth);

  const features: FeatureInterface[] = readonly(featuresData);

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
    rootMargin: isMobileSize(minWidth) ? '0px' : '-200px',
  });

  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pageRef.current === null) return;

    const { height: clientHeight, y } = pageRef.current.getBoundingClientRect();

    if (headerState.y === 0) {
      setHeaderState((state) => ({
        ...state,
        y: y * -1,
      }));

      return;
    }

    const onScroll = throttle(() => {
      if (pageRef.current === null) return;

      const { innerHeight } = window;

      const scrollY = pageRef.current.getBoundingClientRect().y * -1;

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

      setIsMouseVisible(() => false);
      setHeaderState((state) => ({
        ...state,
        rotate: 0,
        scale: 0.7,
        origin: 'top left',
        opacity: 0.3,
      }));

      return undefined;
    }, 20);

    if (headerState.isActive) {
      window.addEventListener('scroll', onScroll);
      window.addEventListener('touchmove', onScroll);
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headerState.isActive, headerState.y]);

  const [nowActiveSkill, setNowActiveSkill] = useState<SkillInterface>({
    id: 0,
    name: '',
    src: '',
    checks: [],
  });

  const onClickSkill = (skill: SkillInterface) => {
    setNowActiveSkill(() => skill);
  };

  const Skills = {
    HTML5: 'HTML5',
    CSS3: 'CSS3',
    JavaScript: 'JavaScript',
    TypeScript: 'TypeScript',
    React: 'React',
    Vue3: 'Vue3',
    NextJS: 'NextJS',
    Storybook: 'Storybook',
    Quasar: 'Quasar',
    NodeJS: 'Node.js',
    AWS: 'AWS',
    CICD: 'CICD',
  } as const;

  const skills: SkillInterface[] = skillsData;

  return (
    <>
      <Head>
        <title>JengYoung&apos;s Portfolio | ?????? ????????</title>
        <meta property="og:type" content="portfolio" />
        <meta property="og:title" content="JengYoung's Portfolio | ??????" />
        <meta property="og:url" content="https://jengyoung.me/about" />
        <meta property="og:image" content="/ogs/og-image.png" />
        <meta property="og:description" content="?????? ????????? ???????????????????! ?????? ?????? ????????" />
        <meta property="og:site_name" content="JengYoung's Portfolio" />
        <meta property="og:locale" content="ko_KR" />
      </Head>

      <Styled.Page ref={pageRef}>
        <Styled.Introduction>
          <ForwardedCanvas width={minWidth} height={minHeight} ref={canvasRef} />
          <Styled.CopyBox>
            <Styled.IntroductionMainCopy>
              <CollapsedText x={(windowState.innerWidth ?? 0) + 500} y={0} direction="LEFT">
                <Gummy texts="???????????????&nbsp;?????????" delay={1.5} />
              </CollapsedText>
            </Styled.IntroductionMainCopy>

            <Styled.IntroductionMainCopy>
              <CollapsedText x={-500} y={0} direction="RIGHT">
                <Styled.Name>
                  <Gummy texts="?????????" delay={1.5} options={{ isGummy: true, infinite: true }} />
                </Styled.Name>
                <Gummy texts="?????????" delay={1.5} />
              </CollapsedText>
            </Styled.IntroductionMainCopy>

            <Styled.IntroductionSubCopy>
              <div>???????????? ?????????, ??? ?????? ????????? ?????? ????????? ????????????.</div>
              <div>???????????? ????????? ????????? ???????????? ?????????</div>
              <div>??? ?????? UX??? ???????????? ????????? ?????? ?????? ?????????.</div>
            </Styled.IntroductionSubCopy>
          </Styled.CopyBox>

          <Styled.ProfileImage
            top={minHeight * 0.7 - (isMobileSize(minWidth) ? 100 : 140)}
            size={isMobileSize(minWidth) ? 200 : 280}
            src="profile.webp"
            alt="?????????"
          />
        </Styled.Introduction>

        <Styled.Features>
          <Styled.FeatureHeader>
            <svg width={minWidth}>
              {featuresHeaderTexts.map((text) => (
                <text key={text.x + text.y + text.value} x={text.x} y={text.y}>
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
          <Styled.SkllContainer>
            <Styled.SkillHeader ref={skillHeaderRef} headerState={headerState}>
              SKILLS
            </Styled.SkillHeader>

            {nowActiveSkill.src && (
              <Styled.NowSkillDetailContainer>
                <Styled.NowSkillImageContainer>
                  <Image src={nowActiveSkill.src} layout="fill" objectFit="contain" />
                </Styled.NowSkillImageContainer>

                <Styled.NowSkillImageName>
                  <CollapsedText x={-500} y={0} direction="LEFT">
                    <Gummy key={nowActiveSkill.name} texts={nowActiveSkill.name} delay={1.5} />
                  </CollapsedText>
                </Styled.NowSkillImageName>

                <Styled.NowSkillDescriptions>
                  {nowActiveSkill.checks.map((check) => (
                    <Styled.NowSkillDescription>- {check}</Styled.NowSkillDescription>
                  ))}
                </Styled.NowSkillDescriptions>
              </Styled.NowSkillDetailContainer>
            )}
          </Styled.SkllContainer>
          <Styled.Skills>
            {skills.map((skill) => {
              const isSeparate = [Skills.TypeScript, Skills.Vue3, Skills.Quasar].some(
                (name) => name === skill.name
              );
              return (
                <Styled.SkillContainer key={skill.id}>
                  <Styled.Skill>
                    <Styled.ImageContainer onClick={() => onClickSkill(skill)}>
                      <Image
                        objectFit="contain"
                        src={skill.src}
                        alt="vercel"
                        width="58"
                        height="58"
                      />
                    </Styled.ImageContainer>
                    {nowActiveSkill.name === skill.name && <Styled.ActiveDot />}
                  </Styled.Skill>
                  {isSeparate && <Styled.Separator key={skill.src} />}
                </Styled.SkillContainer>
              );
            })}
          </Styled.Skills>
        </Styled.SkillSection>

        <Styled.MouseContainer>
          <ScrollMouse bottom="1rem" delay={1.5} visible={isMouseVisible} />
        </Styled.MouseContainer>
      </Styled.Page>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  return {
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    props: {},
    revalidate: 300, // In seconds
  };
}

AboutPage.getLayout = getBaseLayout;
export default AboutPage;
