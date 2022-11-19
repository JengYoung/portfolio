import React, { useEffect, useMemo, useRef, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { css } from '@emotion/react';
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

import globalTheme from '@styles/globalTheme';

import { getMainMetaball } from '@utils/metaballs/getMainMetaball';
import getStaticBubbles from '@utils/metaballs/getStaticBubbles';
import readonly from '@utils/readonly';
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

const ContainerCSS = (theme: typeof globalTheme) => css`
  position: relative;

  max-width: 1440px;
  height: 100vh;
  max-height: 1024px;
  margin: 0 auto;

  overflow: hidden;
  background-color: white;

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
    color: ${({ theme }) => theme.colors.primary.dark};
  `,

  Features: styled.section`
    ${({ theme }) => ContainerCSS(theme)}

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
      color: ${theme.colors.dark};
    `}
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
    align-items: center;
    overflow: hidden;
    ${({ theme }) => ContainerCSS(theme)}
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

  NowSkillImageContainer: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 600px;
    height: 600px;
    transform: rotate(-30deg);
  `,
  NowSkillDetailContainer: styled.section`
    position: relative;
    flex-direction: column;
    height: 100%;
    padding: 5rem;
    margin-top: 5rem;
  `,
  NowSkillImageName: styled.div`
    position: relative;
    z-index: 10;

    width: 100%;

    margin: 0;
    line-height: 1.5;
    ${({ theme }) => css`
      color: ${theme.colors.subPrimary};
      text-shadow: 5px 5px ${theme.colors.primary.light};
    `}

    ${({ theme }) => css`
      font-size: calc(${theme.heads[1].size} * 2);
      font-weight: ${theme.heads[1].weight};
    `}
  `,
  NowSkillDescriptions: styled.ul`
    margin-top: 1rem;
  `,
  NowSkillDescription: styled.li`
    ${({ theme }) => css`
      font-size: ${theme.fontSizes.l};
      font-weight: ${theme.fontWeights.default};
      color: ${theme.colors.subPrimary};
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
    overflow: scroll;
    background-color: rgba(0, 0, 0, 0.58);
    border-radius: 20px;
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

  const initialGradientColors: GradientType = ['#fff', '#fff'];
  const metaballGradientColors: GradientType = [
    globalTheme.colors.primary.dark,
    globalTheme.colors.primary.light,
  ];

  const canvasRef = useRef(null);

  useMetaball({
    canvasRef,
    baseFillColor: globalTheme.colors.canvasBackground,
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
    rootMargin: '-200px',
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
    } else {
      window.removeEventListener('scroll', onScroll);
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
        <title>JengYoung&apos;s Portfolio | 소개 🙆🏻</title>
        <meta property="og:type" content="portfolio" />
        <meta property="og:title" content="JengYoung's Portfolio | 소개" />
        <meta property="og:url" content="https://jengyoung.me/about" />
        <meta property="og:image" content="/ogs/og-image.png" />
        <meta property="og:description" content="제가 누군지 궁금하시나요?! 어서 와요 👋🏻" />
        <meta property="og:site_name" content="JengYoung's Portfolio" />
        <meta property="og:locale" content="ko_KR" />
      </Head>

      <Styled.Page ref={pageRef}>
        <Styled.Introduction>
          <ForwardedCanvas width={minWidth} height={minHeight} ref={canvasRef} />
          <Styled.CopyBox>
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

            <Styled.IntroductionSubCopy>
              <div>부족함을 알기에, 더 나은 자신을 위해 꾸준히 공부해요.</div>
              <div>최적화와 새로운 것들에 호기심을 가지며</div>
              <div>더 나은 UX를 제공하며 성장할 팀을 찾고 있어요.</div>
            </Styled.IntroductionSubCopy>
          </Styled.CopyBox>

          <Styled.ProfileImage
            top={minHeight * 0.7 - (isMobileSize(minWidth) ? 100 : 140)}
            size={isMobileSize(minWidth) ? 200 : 280}
            src="profile.gif"
            alt="프로필"
          />
        </Styled.Introduction>

        <Styled.Features>
          <Styled.FeatureHeader>
            <svg width={600} height={100} viewBox="0 0 600 100">
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
          <Styled.SkllContainer />
          <Styled.SkillHeader ref={skillHeaderRef} headerState={headerState}>
            SKILLS
          </Styled.SkillHeader>

          {nowActiveSkill.src && (
            <Styled.NowSkillDetailContainer>
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

              <Styled.NowSkillImageContainer>
                <Image src={nowActiveSkill.src} layout="fill" objectFit="contain" />
              </Styled.NowSkillImageContainer>
            </Styled.NowSkillDetailContainer>
          )}
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
AboutPage.getLayout = getBaseLayout;
export default AboutPage;
