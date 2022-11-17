import React, { MouseEvent, createRef, useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Browser, ProjectInterface } from '@components/Browser';
import LinksImage, { ImageSizeOption } from '@components/Links/LinksImage';
import { CollapsedText } from '@components/Text';
import Gummy from '@components/Text/Gummy';
import { getBaseLayout } from '@components/layouts';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import readonly from '@utils/readonly';
import throttle from '@utils/throttle';

interface ExperienceInterface {
  id: number;
  type: string;
  title: string;
  period: {
    start: string;
    end: string;
  };
  skills: string[];
  contents: string[];
  images: {
    src: string;
    alt: string;
    options: Omit<ImageSizeOption<string>, 'size'>;
    links: { href: string; name: string; iconSrc: string }[];
  }[];
}

const StyledPage = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: inherit;
  `,
  Inner: styled.section`
    width: 100%;
    max-width: 1440px;
    height: 100%;
    min-height: inherit;
  `,
  ProjectIntro: styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 1024px;
    overflow: hidden;
  `,
  Projects: styled.section<{ perspective: { x: number; y: number } }>`
    position: relative;
    width: 100%;
    max-width: 1440px;
    height: 100vh;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.primary.light};
    transition: all 0.3s;
    perspective: 100vw;
    perspective-origin: ${({ perspective }) => `${perspective.x}% ${perspective.y}%`};
  `,
};

const Title = styled.header`
  font-size: ${({ theme }) => `calc(${theme.fontSizes.max} * 4)`};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`;

const StyledExperience = {
  Container: styled(StyledPage.Inner)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary.dark};
  `,

  TitleContainer: styled(Title)`
    color: ${({ theme }) => theme.colors.primary.light};
  `,

  ReverseText: styled.strong<{ reversed: boolean }>`
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;

    transition: all 0.5s;

    ${({ reversed }) =>
      reversed &&
      css`
        animation: reverse-text 0.3s forwards;
        animation-delay: 0.25s;

        @keyframes reverse-text {
          to {
            transform: rotate(180deg) scale(1.1);
            transform-origin: 50% 60%;
          }
        }
      `}
  `,
  LineContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: inherit;
    padding-bottom: 10rem;
    overflow: hidden;
  `,
  Line: styled.div<{ draw: boolean }>`
    position: absolute;
    top: 0;

    width: 1px;
    height: inherit;

    background-color: ${({ theme }) => theme.colors.primary.light};

    opacity: 0;
    transition: all 1s;

    ${({ draw }) =>
      draw &&
      css`
        opacity: 1;
      `}
  `,
  ExperienceContainer: styled.article`
    position: relative;
    display: flex;

    width: 100%;
    height: 100%;
    margin: 5rem 0;
  `,
  Circle: styled.div<{ index: number; visible: boolean }>`
    z-index: 1;
    width: 3rem;
    height: 3rem;
    margin-left: auto;
    visibility: hidden;
    background-color: ${({ theme }) => theme.colors.primary.light};
    border-radius: 50%;

    transition: all 0.5s ease-in;
    transform: scale(0);

    ${({ visible }) =>
      visible &&
      css`
        visibility: visible;
        animation: circle-occur forwards;
        animation-duration: 0.5s;

        @keyframes circle-occur {
          0% {
            transform: scale(0);
          }
          60% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
      `};
  `,
  ImageContainer: styled.div`
    position: absolute;
    border-radius: 50px;
    box-shadow: -4px 10px 10px 10px rgba(0, 0, 0, 0.3);
    &:first-of-type {
      left: 5rem;
      transform: rotateY(30deg) rotateZ(-10deg);
    }
    &:last-of-type&:not(:first-of-type),
    &:nth-of-type(2n + 2) {
      top: 10rem;
      left: 17.5rem;
      transform: rotateY(-30deg) rotateZ(20deg);
      transform-origin: right;
    }
    &:nth-of-type(2n + 3) {
      top: 20rem;
      left: 5rem;
      transform: rotateY(30deg) rotateZ(-10deg);
    }
    &:last-of-type&:not(:first-of-type)&:nth-of-type(n + 4) {
      top: 27rem;
      left: 20rem;
      transform: rotateY(-20deg) rotateZ(10deg) scale(1.1);
    }
  `,
  Details: styled.section`
    position: relative;
    width: calc(50% - 1rem - 1.5rem);
    margin-left: 1rem;
  `,
  DetailHeader: styled.header`
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.heads[2].size};
    font-weight: ${({ theme }) => theme.heads[2].weight};
    line-height: 1;
  `,
  DetailDescriptions: styled.ul`
    font-size: ${({ theme }) => theme.fontSizes.l};
    font-weight: ${({ theme }) => theme.fontWeights.default};
  `,
  DetailDescription: styled.li`
    &:before {
      content: '- ';
    }
  `,
  Images: styled.ul<{ draw: boolean; shouldShowHistories: boolean }>`
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.3s;
    perspective: 100vw;

    ${({ draw, shouldShowHistories }) =>
      draw &&
      shouldShowHistories &&
      css`
        display: block;
        animation: image-occur 1s ease-out forwards;
        animation-delay: 0.75s;
        @keyframes image-occur {
          0% {
            opacity: 0;
            transform: translateY(0.5rem);
          }
          50% {
            opacity: 1;
            transform: translateY(-0.5rem);
          }
          100% {
            opacity: 1;
          }
        }
      `}
  `,
};

const Commit = styled.div`
  position: absolute;
  top: -1.5rem;
  left: -1.5rem;
  display: flex;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary.light};
`;

const Branch = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border: 2px solid ${({ theme }) => theme.colors.success};
`;

const StyledGitGraph = {
  Container: styled.article`
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: 50%;
  `,
  Branch: {
    Container: styled.div<{ draw: boolean; shouldShowHistories: boolean }>`
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s;

      ${({ draw, shouldShowHistories }) =>
        draw &&
        shouldShowHistories &&
        css`
          transform-origin: left;
          animation: scale-up 1s ease-out forwards;
          animation-delay: 0.25s;
          @keyframes scale-up {
            0% {
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
    `,
    MergedCommitContainer: styled.div`
      position: relative;
      display: flex;
      align-items: flex-start;
      width: 100%;
      height: 3rem;
    `,
    MergedBranch: styled(Branch)`
      border-bottom: 0;
      border-left: 0;
      border-top-right-radius: 5rem;
    `,

    BasedBranch: styled(Branch)`
      border-top: 0;
      border-left: 0;
      border-bottom-right-radius: 5rem;
    `,
    MergedCommit: styled(Commit)`
      top: -1.5rem;
      left: -1.5rem;
    `,
    BasedCommit: styled(Commit)`
      top: 1.5rem;
      left: -1.5rem;
    `,
    Body: styled.div<{ commitCount: number }>`
      width: 3rem;
      height: ${({ commitCount }) => `calc(5 * ${commitCount}rem)`};
      border-right: 2px solid ${({ theme }) => theme.colors.success};
    `,
    End: styled.div`
      width: 3rem;
      height: 3rem;
      border: 2px solid ${({ theme }) => theme.colors.success};
      border-top: 0;
      border-left: 0;
      border-bottom-right-radius: 5rem;
    `,
  },
  Histories: {
    Container: styled.div<{ length: number }>`
      width: 100%;
      height: 100%;
    `,
  },
  History: {
    Container: styled.div`
      position: relative;
      display: flex;
      padding: 1rem 0;
      margin-left: calc(1.5rem + 2px);
    `,

    Dot: styled.div<{ main?: boolean; period?: string }>`
      position: relative;
      display: flex;
      flex-shrink: 0;
      width: ${({ main }) => `${main ? '3rem' : '2.5rem'}`};
      height: ${({ main }) => `${main ? '3rem' : '2.5rem'}`};
      margin-right: 0.75rem;
      background-color: ${({ main, theme }) =>
        main ? theme.colors.primary.light : theme.colors.success};
      border-radius: 50%;

      &:before {
        position: absolute;
        left: -6rem;
        z-index: 99;
        display: block;
        align-self: center;
        width: 5rem;
        text-align: right;
        content: '${({ period }) => period}';
      }
    `,
    CommitMessage: styled.span<{ main?: boolean }>`
      align-self: center;
      justify-items: flex-end;
      width: 100%;
      font-size: ${({ main, theme }) => (main ? theme.fontSizes.xxl : theme.fontSizes.l)};
      font-weight: ${({ main, theme }) =>
        main ? theme.heads[4].weight : theme.fontWeights.default};
    `,
    Line: styled.div`
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(1.5rem - 4px);

      border: 1px solid ${({ theme }) => theme.colors.success};
    `,
  },
};

const StyledProjectIntro = {
  Ball: styled.div<{ ballScale: number }>`
    top: 90%;
    width: 3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.primary.light};
    border-radius: 50%;
    transition: all 0.2s;
    transform: ${({ ballScale }) => `scale(${ballScale})`};
    transform-origin: top;
  `,
  Title: styled(Title)`
    position: relative;
    perspective: 1000vw;
    top: 50%;
    z-index: 99;
    align-self: center;
    color: ${({ theme }) => theme.colors.subPrimary};
  `,
};

const Card = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 300px;
  height: 200px;

  cursor: pointer;
  background: white;
  border-radius: 20px;
  transition: all 0.3s;
  transform-style: preserve-3d;

  &:hover {
    background-color: #eeeeee;
  }
`;

const StyledProject = {
  Card1: styled(Card)`
    top: 150px;
    left: 100px;
    z-index: 3;

    transform: scale(1.4) rotateX(30deg) rotateY(-20deg) rotateZ(-15deg) translate3d(50px, 0, 0);

    transform-origin: top;
    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -999;

      width: 300px;
      height: 200px;
      cursor: auto;

      content: '';

      border-radius: 20px;
      box-shadow: -20px 50px 100px rgba(0, 0, 0, 0.2);

      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(-0px, 0px, -1px);
    }
  `,
  Card2: styled(Card)`
    top: 200px;
    left: 300px;
    z-index: 2;

    transform: scale(1.3) rotateX(50deg) rotateY(-20deg) rotateZ(-65deg)
      translate3d(-50px, 100px, 0px);
    transform-origin: center;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;

      width: 300px;
      height: 200px;

      content: '';

      border-radius: 20px;
      box-shadow: -50px 0px 150px rgba(0, 0, 0, 0.3);
      transform: scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  `,
  Card3: styled(Card)`
    position: absolute;
    top: 400px;
    left: 150px;

    width: 300px;
    height: 200px;

    transform: scale(1.3) rotateX(50deg) rotateY(50deg) rotateZ(15deg);
    transform-origin: center;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;

      width: 300px;
      height: 200px;
      cursor: auto;

      content: '';

      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(50px);

      transform: rotateX(10deg) rotateY(-30deg) rotateZ(0deg) translate3d(0px, 0px, -100px);
    }
  `,
  CardContainer: styled.div`
    position: relative;
    /* display: flex;
    align-items: center; */
    width: 100%;
    height: 70%;
    overflow: hidden;
  `,
  Card4: styled(Card)`
    position: absolute;
    top: 500px;
    left: 350px;

    width: 300px;
    height: 200px;

    transform: scale(1.5) rotateX(50deg) rotateY(10deg) rotateZ(5deg) translate3d(90px, -50px, 0px);
    transform-origin: center;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;

      width: 300px;
      height: 200px;
      cursor: auto;

      content: '';
      border-radius: 20px;
      box-shadow: -50px 50px 50px rgba(0, 0, 0, 0.3);
    }
  `,
  ProjectTitle: styled.header`
    height: 96px;
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.heads[1].size};
    font-weight: ${({ theme }) => theme.heads[1].weight};
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.2);
  `,
  BrowserContainer: styled.div`
    position: absolute;
    right: 5rem;
    z-index: 9999;

    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
  `,
  Video: styled.video`
    width: 100%;
  `,
};

function ExperiencesAndProjectsPage() {
  const [textReversed, setTextReversed] = useState(false);
  // const [nowPassedExperienceIndex, setNowPassedExperienceIndex] = useState(-1);

  const [isDrawLine, setIsDrawLine] = useState({
    start: false,
    end: false,
  });

  useEffect(() => {
    setTextReversed(() => true);
  }, []);

  const projects: readonly ProjectInterface[] = [
    {
      id: 0,
      title: '웹 포트폴리오',
      period: {
        start: '2022.10',
        end: '진행 중',
      },
      thumbnail: { type: 'video', src: '/profile.gif' },

      contents: [
        {
          id: 1000,
          type: 'intro',
          title: '💡 설명',
          skills: [
            'Next.js',
            'React',
            'husky',
            'recoil',
            '@emotion',
            'TypeScript',
            'AWS(S3, Route 53, CloudFront)',
            'Github Action',
            'yarn berry',
            'Canvas API',
          ],
          descriptions: [
            '저만의 웹 포트폴리오 사이트에요 🥰',
            '상단의 탭들을 클릭하면 자세히 볼 수 있어요.',
          ],
          background: { type: 'video', src: '/projects/portfolio.mp4' },
        },

        {
          id: 1003,
          type: 'detail',
          title: 'Interaction',
          descriptions: [
            '아이콘 하나라도 만져보고 싶도록 다양한 인터렉티브 효과들을 시도했어요.',
            '제가 만든 앱이 유저에게 설레고 기대되는 앱이었으면 좋겠어요.',
          ],
          background: {
            type: 'video',
            src: '/projects/portfolio-interaction.mp4',
          },
        },

        {
          id: 1004,
          type: 'detail',
          title: 'CICD',
          descriptions: [
            '일일이 반복된 일을 하는 건 너무 번거로워요.',
            '따라서 배포 및 릴리즈 노트 템플릿 생성을 자동화했어요.',
            '이슈 및 PR을 업데이트하며 할 일을 체크해요.',
          ],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },
      ],
    },

    {
      id: 0,
      title: 'JS, React Libs',
      period: {
        start: '2022.08',
        end: '진행 중',
      },
      thumbnail: {
        type: 'video',
        src: '/projects/metaball.mp4',
      },

      contents: [
        {
          id: 1000,
          type: 'intro',
          title: '💡 설명',
          skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
          descriptions: [
            '세상에는 재사용할 수 있을 코드들이 많아요.',
            '언젠가 재사용하기 위해 재미로 삼아 구현한 코드들을 모아놓아요.',
          ],
          background: {
            type: 'video',
            src: '/projects/metaball.mp4',
          },
        },

        {
          id: 1001,
          type: 'detail',
          title: 'Metaball',
          descriptions: [
            '메타볼 애니메이션을 구현했어요.',
            '터지거나, 제한적으로 이동하는 다양한 옵션을 추가했어요.',
          ],
          background: {
            type: 'video',
            src: '/projects/metaball.mp4',
          },
        },

        {
          id: 1002,
          type: 'detail',
          title: 'Calendar',
          descriptions: [
            '노션처럼 일정을 등록하는 캘린더 컴포넌트를 구현했어요.',
            '쌓일 일정이 변경될 때마다 깔끔하게 쌓이도록 구현했어요! 🧱',
          ],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },

        {
          id: 1003,
          type: 'detail',
          title: 'About',
          descriptions: [
            '웹도 앱처럼 페이지 전환 효과가 있다면 어떨까요?',
            '자연스러운 페이지 전환 효과를 만들었어요.',
          ],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },
      ],
    },

    {
      id: 2,
      title: 'Design System',
      period: {
        start: '2022.05',
        end: '진행 중',
      },
      thumbnail: {
        type: 'image',
        src: '/profile.gif',
      },

      contents: [
        {
          type: 'intro',
          title: '💡 설명',
          id: 1000,
          skills: ['Vue3', 'Storybook'],
          descriptions: ['Vue 3로 다양한 컴포넌트를 만들었어요.', '한 번 탭들을 눌러 살펴볼까요?'],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },

        {
          type: 'detail',
          title: 'Carousel',
          id: 1001,
          skills: ['Vue3', 'Storybook'],
          descriptions: ['Carousel을 구현했어요.'],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },

        {
          type: 'detail',
          title: 'Menu',
          id: 1002,
          skills: ['Vue3', 'Storybook'],
          descriptions: ['뷰포트에 따라 유기적으로 동작하는 메뉴를 만들었어요.'],
          background: {
            type: 'image',
            src: '/profile.gif',
          },
        },
      ],
    },

    {
      id: 3,
      title: 'SeeYouLetter',
      period: {
        start: '2022.11',
        end: '진행 중',
      },
      thumbnail: {
        type: 'image',
        src: '/projects/seeyouletter.png',
      },

      contents: [
        {
          id: 1000,
          type: 'intro',
          title: '💡 설명',
          skills: [
            'Next.js',
            'React Native',
            'Storybook',
            'Playwright',
            'jotai',
            'react-query',
            'yarn-berry',
            'turborepo',
            'AWS',
          ],
          descriptions: [
            '페이지 제작 플랫폼을 기획하고 있어요.',
            '현재 기획 단계에 있으며, 조만간 만날 계획이에요.',
            'See you later at See You Letter! 👋🏻🖐🏻👋🏻',
          ],
          background: {
            type: 'image',
            src: '/projects/seeyouletter.png',
          },
        },
      ],
    },
  ];

  const experiences: readonly ExperienceInterface[] = readonly([
    {
      id: 0,
      type: '스터디',
      title: '자바스크립트 스터디',
      period: {
        start: '2022.08',
        end: '2022.11',
      },

      images: [
        {
          src: '/experiences/js-study-1.png',
          alt: '자바스크립트 스터디 블로그',
          links: [
            {
              iconSrc: '/velog.png',
              href: 'https://velog.io/@young_pallete/series/REAL-JavaScript-Deep-Dive',
              name: 'Velog',
            },
          ],
        },
        {
          src: '/experiences/js-study-2.png',
          alt: '자바스크립트 스터디 중간 미션',
          links: [
            {
              iconSrc: '/github.png',
              href: 'https://github.com/FE-DeepDive/JavaScript-DeepDive',
              name: 'GitHub',
            },
          ],
        },
      ],

      skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
      contents: [
        '모던 자바스크립트 Deep Dive를 기반으로 4개월 간 진행',
        '스터디원 간 Git 관리 전략 설계 및 문서화',
        '중간 과제를 서로 출제하며 톺아나가는 방식 제안 및 실행',
        '주마다 Tech Blog에 탐구한 지식들 정리하여 게재',
      ],
    },

    {
      id: 1,
      type: '프론트엔드 개발자',
      title: '컨트롤클로더 프론트엔드 개발자',
      period: {
        start: '2022.01',
        end: '2022.08',
      },

      images: [
        {
          src: '/experiences/faai.png',
          alt: 'FAAI 랜딩 페이지 사진',
          links: [
            {
              iconSrc: '/faai-logo.png',
              href: 'https://apps.faai.io',
              name: 'deprecated😭',
            },
          ],
        },
      ],

      skills: ['Quasar', 'Vue', 'Tailwind CSS', 'AWS', 'Github Actions'],
      contents: [
        '고객 앱 반응형으로 제작 수행',
        'Git Flow로 Git History 전략 개선, CICD 자동화',
        'Vue2 -> Vue3 마이그레이션 경험',
        '랜딩 페이지 구현',
        '원단 관리 페이지 구현',
        '어드민 앱, 고객 앱 유지보수',
      ],
    },

    {
      id: 2,
      type: '스터디',
      title: '알고리즘 스터디',
      period: {
        start: '2021.09',
        end: '진행 중',
      },

      images: [
        {
          src: '/experiences/algo-study-1.png',
          alt: '프로필 사진',
          links: [
            {
              iconSrc: '/notion.png',
              href: 'https://www.notion.so/hysoung/76b0f59af9dd4765b7899b58bfabb5d9',
              name: 'Notion',
            },
          ],
        },
      ],

      skills: ['Vanilla JS'],
      contents: [
        '꾸준히 문제해결 능력을 기르고자 알고리즘 스터디 진행',
        '프로그래머스 기준 Lv1 ~ Lv4까지 진행 중',
        '진행 중까지도 진행 중이며, 개발 경험도 함께 공유하며 성장 중',
      ],
    },

    {
      id: 3,
      type: '교육',
      title: '프로그래머스 프론트엔드 엔지니어링 데브코스 1기',
      period: {
        start: '2021.07',
        end: '2021.11',
      },

      images: [
        {
          src: '/experiences/dev-course-everevent-1.png',
          alt: 'Everevent Thumbnail',
          links: [
            {
              iconSrc: '/github.png',
              href: 'https://github.com/prgrms-web-devcourse/Team_Everevent_Kazedon_FE',
              name: 'GitHub',
            },
            {
              iconSrc: '/figma.png',
              href: 'https://www.figma.com/file/q5xaTRyIEc0dKaici9EETe/dev-course-final-6th?node-id=0%3A1',
              name: 'Figma ',
            },
          ],
        },

        {
          src: '/experiences/dev-course-everevent-2.png',
          alt: 'Everevent TWL',
          links: [
            {
              iconSrc: '/notion.png',
              href: 'https://oranjik.notion.site/Programmers-6-bc57a5a7efed4fd1872261fcb5e0fdac',
              name: 'Notion',
            },
          ],
        },

        {
          src: '/experiences/dev-course-mogakco-1.gif',
          alt: '달리는 모각코 시연',
          links: [
            {
              iconSrc: '/github.png',
              href: 'https://github.com/prgrms-fe-devcourse/FEDC1_Mogakco_Dali2',
              name: 'GitHub (Privated)',
            },
            {
              iconSrc: '/figma.png',
              href: 'https://www.figma.com/file/LG4OgrH8Gh9weQnuGfsGeh/Dali-mogakco?node-id=0%3A1',
              name: 'Figma',
            },
          ],
          options: {
            objectFit: 'contain',
            bg: '#333',
          },
        },

        {
          src: '/experiences/dev-course-mogakco-2.png',
          alt: '달리는 모각코 TWL',
          links: [
            {
              iconSrc: '/notion.png',
              href: 'https://jayday.notion.site/jayday/2-05e5cbd74c2441adad8439810cce1be8',
              name: 'Notion',
            },
          ],
        },
      ],

      skills: [
        'HTML5',
        'CSS3',
        'VanillaJS',
        'React',
        'Vue',
        'Next.js',
        'Redux',
        'Storybook',
        'D3.js',
      ],

      contents: [
        '이벤트 애플리케이션 개발(Everevent)',
        '11월 배움 기록왕 선정',
        '모각코 애플리케이션 개발(달리는 모각코)',
        '8월 이달의 스피커 선정',
        '주마다 TIL 기록 및 과제 수행',
      ],
    },
  ]);

  const [shouldShowHistories, setShouldShowHistories] = useState(
    new Array(experiences.length).fill(false)
  );

  const experienceRefs = useRef([]);
  experienceRefs.current = experiences.map((_, i) => experienceRefs.current[i] ?? createRef());

  const useExperienceRefsCallback = (idx: number) =>
    useRef<IntersectionObserverCallback>((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldShowHistories((state) => state.map((v, i) => (i === idx ? true : v)));
        }
      });
    });

  const experienceOptions = {
    rootMargin: '-100px',
    threshold: 0,
  };

  useIntersectionObserver(
    experienceRefs.current[0],
    useExperienceRefsCallback(0),
    experienceOptions
  );
  useIntersectionObserver(
    experienceRefs.current[1],
    useExperienceRefsCallback(1),
    experienceOptions
  );
  useIntersectionObserver(
    experienceRefs.current[2],
    useExperienceRefsCallback(2),
    experienceOptions
  );
  useIntersectionObserver(
    experienceRefs.current[3],
    useExperienceRefsCallback(3),
    experienceOptions
  );

  const targetRef = useRef<HTMLElement>(null);
  const [ballScale, setBallScale] = useState(1);

  useEffect(() => {
    if (targetRef.current === null) return undefined;
    const { innerHeight, scrollY } = window;
    const rootMargin = innerHeight * 0.1;

    const onScroll = throttle(() => {
      if (targetRef.current === null) return;

      const { top, height } = targetRef.current.getBoundingClientRect();

      const isIntersecting = top + rootMargin >= innerHeight;
      if (isIntersecting) return;

      setBallScale(() => Math.max(1, ((innerHeight - top - rootMargin) / height) * 50));
    }, 20);

    if (scrollY !== 0) {
      onScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [projectIndex, setProjectIndex] = useState(-1);

  const [perspective, setPerspective] = useState({ x: 0, y: 0 });
  const onMouseOver = throttle((e: MouseEvent) => {
    const { screenX, screenY } = e;

    const nextX = Math.min(Math.max(((1440 - screenX) / 1440) * 100));
    const nextY = Math.min(Math.max(((1024 - screenY) / 1024) * 100));

    setPerspective(() => ({ x: nextX, y: nextY }));
  }, 30);

  const onClickCard = (idx: number) => {
    setProjectIndex(() => idx);
  };

  return (
    <>
      <Head>
        <title>JengYoung&apos;s Portfolio | 경험 🖥</title>
        <meta property="og:type" content="portfolio" />
        <meta property="og:url" content="https://jengyoung.me/experiences-and-projects" />
        <meta property="og:title" content="JengYoung's Portfolio | 경험" />
        <meta property="og:image" content="/ogs/og-image.png" />
        <meta property="og:description" content="개발자로서 제 경험들을 보여드립니다! 👋🏻" />
        <meta property="og:site_name" content="JengYoung's Portfolio" />
        <meta property="og:locale" content="ko_KR" />
      </Head>

      <StyledPage.Container>
        <StyledExperience.Container>
          <StyledExperience.TitleContainer>
            <Gummy texts="exper" delay={0} />
            <StyledExperience.ReverseText
              onAnimationEnd={() => setIsDrawLine((state) => ({ ...state, start: true }))}
              reversed={textReversed}
            >
              i
            </StyledExperience.ReverseText>
            <Gummy texts="ences" delay={0} />
          </StyledExperience.TitleContainer>

          <StyledExperience.LineContainer>
            <StyledExperience.Line
              draw={isDrawLine.start}
              onTransitionEnd={() => setIsDrawLine((state) => ({ ...state, end: true }))}
            />

            {experiences.map((nowExperience, idx) => (
              <StyledExperience.ExperienceContainer
                key={nowExperience.id}
                ref={experienceRefs.current[idx]}
              >
                <StyledExperience.Images
                  draw={isDrawLine.start}
                  shouldShowHistories={shouldShowHistories[idx]}
                >
                  {nowExperience.images.map((obj) => (
                    <StyledExperience.ImageContainer key={obj.src}>
                      <LinksImage
                        image={{ src: obj.src, alt: obj.alt }}
                        imageOptions={{
                          size: {
                            width: nowExperience.images.length === 1 ? '22.5rem' : '15rem',
                            height: nowExperience.images.length === 1 ? '22.5rem' : '15rem',
                          },
                          objectFit: obj.options?.objectFit ?? 'cover',
                          bg: obj.options?.bg,
                        }}
                        links={obj.links}
                      />
                    </StyledExperience.ImageContainer>
                  ))}
                </StyledExperience.Images>
                <StyledGitGraph.Container>
                  <StyledGitGraph.Branch.Container
                    draw={isDrawLine.start}
                    shouldShowHistories={shouldShowHistories[idx]}
                  >
                    <StyledGitGraph.Branch.MergedCommitContainer>
                      <StyledGitGraph.Branch.MergedBranch />
                      <StyledGitGraph.Branch.MergedCommit>
                        <StyledGitGraph.History.Dot main period={nowExperience.period.end} />
                        <StyledGitGraph.History.CommitMessage main>
                          {nowExperience.title}
                        </StyledGitGraph.History.CommitMessage>
                      </StyledGitGraph.Branch.MergedCommit>
                    </StyledGitGraph.Branch.MergedCommitContainer>

                    {nowExperience.contents.map((content) => (
                      <StyledGitGraph.History.Container key={content}>
                        <StyledGitGraph.History.Dot />
                        <StyledGitGraph.History.CommitMessage>
                          {content}
                        </StyledGitGraph.History.CommitMessage>
                        <StyledGitGraph.History.Line />
                      </StyledGitGraph.History.Container>
                    ))}

                    <StyledGitGraph.Branch.MergedCommitContainer>
                      <StyledGitGraph.Branch.BasedBranch />
                      <StyledGitGraph.Branch.BasedCommit>
                        <StyledGitGraph.History.Dot main period={nowExperience.period.start} />
                        <StyledGitGraph.History.CommitMessage main />
                      </StyledGitGraph.Branch.BasedCommit>
                    </StyledGitGraph.Branch.MergedCommitContainer>
                  </StyledGitGraph.Branch.Container>
                </StyledGitGraph.Container>
              </StyledExperience.ExperienceContainer>
            ))}
          </StyledExperience.LineContainer>

          <StyledPage.ProjectIntro ref={targetRef}>
            <StyledProjectIntro.Ball ballScale={ballScale} />
            <StyledProjectIntro.Title>
              <CollapsedText x={500} y={0} direction="RIGHT">
                Projects
              </CollapsedText>
            </StyledProjectIntro.Title>
          </StyledPage.ProjectIntro>

          <StyledPage.Projects onMouseOverCapture={onMouseOver} perspective={perspective}>
            <StyledProject.Card1 onClick={() => onClickCard(0)}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <StyledProject.Video autoPlay muted loop src="/projects/portfolio.mp4" />
            </StyledProject.Card1>
            <StyledProject.Card2 onClick={() => onClickCard(1)}>
              <StyledProject.Video src="/projects/metaball.mp4" autoPlay muted loop />
            </StyledProject.Card2>
            <StyledProject.Card3 onClick={() => onClickCard(2)}>
              <Image src="/profile.gif" layout="fill" objectFit="contain" />
            </StyledProject.Card3>
            <StyledProject.Card4 onClick={() => onClickCard(3)}>
              <StyledProject.CardContainer>
                <Image src="/projects/seeyouletter.png" layout="fill" objectPosition="center" />
              </StyledProject.CardContainer>
            </StyledProject.Card4>

            <StyledProject.BrowserContainer>
              <StyledProject.ProjectTitle>
                {projectIndex >= 0 && (
                  <CollapsedText x={1900} y={0} direction="LEFT">
                    <Gummy
                      texts={projects[projectIndex].title}
                      delay={0}
                      options={{ isGummy: true }}
                    />
                  </CollapsedText>
                )}
              </StyledProject.ProjectTitle>

              <Browser project={projects[projectIndex] ?? null} projectIndex={projectIndex} />
            </StyledProject.BrowserContainer>
          </StyledPage.Projects>
        </StyledExperience.Container>
      </StyledPage.Container>
    </>
  );
}

ExperiencesAndProjectsPage.getLayout = getBaseLayout;
export default ExperiencesAndProjectsPage;
