import { css } from '@emotion/react';
import React, { MouseEvent, createRef, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

import { Browser } from '@components/Browser';
import { CollapsedText } from '@components/Text';
import Gummy from '@components/Text/Gummy';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import readonly from '@utils/readonly';
import throttle from '@utils/throttle';

type IntroContents = {
  type: string;
  skills: string[];
  contents: string[];
};

type DetailContents = {
  type: string;
  title: string;
  contents: string[];
  images?: { src: string; alt: string; contents?: string }[];
};

type OutroContents = {
  type: string;
  title: string;
  contents: string[];
  links: { url: string; iconSrc: string };
};

export interface ProjectInterface {
  id: number;
  type: string;
  title: string;
  period: {
    start: string;
    end: string;
  };
  thumbnailImage: string;
  contents: (IntroContents | DetailContents | OutroContents)[];
}

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
    background-color: ${({ theme }) => theme.colors.primary.light};
    perspective: 100vw;
    perspective-origin: ${({ perspective }) => `${perspective.x}% ${perspective.y}%`};
    transition: all 0.3s;
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
        /* transform: rotate(180deg);
        transform-origin: 50% 60%; */
        animation: element-jump 1s forwards;
        animation-delay: 0.25s;

        @keyframes element-jump {
          0% {
            /* transform: scaleX(1) scaleY(1); */
          }
          20% {
            /* transform: scaleX(1.2) scaleY(0.8); */
          }
          40% {
            /* transform: scaleX(0.9) scaleY(1.1) translateY(-0.5rem); */
          }
          60% {
            /* transform: scaleX(1.05) scaleY(0.95) translateY(0); */
            transform: rotate(180deg) scale(1.1);
            transform-origin: 50% 60%;
          }
          80% {
            /* transform: scaleX(0.97) scaleY(1.03); */
            transform: rotate(180deg) scale(1.1);
            transform-origin: 50% 60%;
          }
          100% {
            /* transform: scaleX(1) scaleY(1); */
            transform: rotate(180deg) scale(1.1);
            transform-origin: 50% 60%;
          }
        }
      `}
  `,
  /* height: ${({ length }) => `${EXPERIENCE_CIRCLE_INTERVAL_SIZE * (length + 1)}px`}; */
  LineContainer: styled.div<{ length: number }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: inherit;
    padding-bottom: 10rem;
    /* overflow: hidden; */
  `,
  Line: styled.div<{ length: number }>`
    position: absolute;
    top: 0;
    width: 1px;
    height: inherit;
    background-color: ${({ theme }) => theme.colors.primary.light};
  `,
  ExperienceContainer: styled.article`
    position: relative;
    display: flex;

    width: 100%;
    height: 100%;
    margin: 5rem 0;
  `,
  /* height: ${EXPERIENCE_CIRCLE_INTERVAL_SIZE}px; */
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
  ImageContainer: styled.div<{ index: number }>`
    position: relative;
    top: calc(-173px + 1.5rem);
    width: 573px;
    height: 346px;
    margin-left: auto;
    background: black;
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
    Container: styled.div`
      flex-shrink: 0;
      width: 100%;
      height: 100%;
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
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 20px;
  transition: all 0.3s;
  transform-style: preserve-3d;
`;

const StyledProject = {
  Card1: styled(Card)`
    top: 100px;
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
      content: '';
      background-color: rgba(0, 0, 0, 0.3);
      filter: blur(50px);

      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(-50px, 50px, -1px);
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
      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(90px);

      transform: scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(-50px, -50px, -1px);
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
      content: '';
      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(50px);

      transform: rotateX(10deg) rotateY(-30deg) rotateZ(0deg) translate3d(0px, 0px, -100px);
    }
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
      content: '';
      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(20px);
      transform: translate3d(-40px, 10px, -1px);
    }
  `,
  BrowserContainer: styled.div`
    position: absolute;
    right: 3rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    height: 100%;
  `,
};

function ExperiencesAndProjectsPage() {
  const [textReversed, setTextReversed] = useState(false);
  // const [nowPassedExperienceIndex, setNowPassedExperienceIndex] = useState(-1);

  useEffect(() => {
    setTextReversed(() => true);
  }, []);

  const projects: readonly ProjectInterface[] = readonly([
    {
      id: 0,
      title: '웹 포트폴리오 사이트',
      period: {
        start: '2022.10',
        end: '진행 중',
      },
      thumbnailImage: '/profile.gif',

      contents: [
        {
          type: 'intro',
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
          contents: [
            '저만의 웹 포트폴리오 사이트에요 🥰',
            '상단의 탭들을 클릭하면 자세히 볼 수 있어요.',
          ],
        },

        {
          type: 'detail',
          title: 'SSG 채택',
          contents: [
            '블로그는 잦은 변경이 발생하지 않아요.',
            '따라서 데이터를 굳이 서버와 주고 받을 필요가 없었어요.',
            '빠르게 정보를 전달하기 위해 SSG를 사용했어요.',
          ],

          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },

        {
          type: 'detail',
          title: 'About',
          contents: ['메타볼 애니메이션을 구현했어요.'],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },

        {
          type: 'detail',
          title: 'Interaction',
          contents: [
            '숨겨진 인터렉티브 효과들이 많아요.',
            '제가 만든 앱이 유저에게 기대되는 앱이었으면 좋겠어요.',
          ],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '이런 기능들도 있구요!',
            },
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '이렇게 움직이기도 한답니다! 😉',
            },
          ],
        },

        {
          type: 'detail',
          title: 'Interaction',
          contents: [
            '숨겨진 인터렉티브 효과들이 많아요.',
            '제가 만든 앱이 유저에게 기대되는 앱이었으면 좋겠어요.',
          ],
          images: [
            {
              src: '/profile.gif',
              alt: 'CICD',
              contents: [
                '일일이 반복된 일을 하는 건 너무 번거로워요.',
                '따라서 배포 및 릴리즈 노트를 자동화했어요.',
                '꾸준한 이슈 및 PR을 업데이트하는 습관은 덤! 😉',
              ],
            },
          ],
        },

        {
          type: 'outro',
          title: '🔗',
          contents: ['어떻게 제작하였는지 궁금한가요?', '아래의 링크를 클릭해 확인해보세요!'],
          links: [
            {
              url: 'https://velog.io/@young_pallete',
              iconSrc: '/profile.gif',
            },
          ],
        },
      ],
    },

    {
      id: 1,
      title: 'JS, React 유틸 라이브러리',
      period: {
        start: '2022.08',
        end: '진행 중',
      },
      thumbnailImage: '/profile.gif',

      contents: [
        {
          id: 1000,
          type: 'intro',
          skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
          contents: [
            '세상에는 정말 재사용할 수 있을 코드들이 많아요.',
            '그 기회들을 위해 재미로 삼아 구현한 코드들을 모아놓아요.',
          ],
        },

        {
          id: 1001,
          type: 'detail',
          title: 'Metaball',
          contents: ['메타볼 애니메이션을 구현했어요.'],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },

        {
          id: 1002,
          type: 'detail',
          title: 'Calendar',
          contents: [
            '캘린더 컴포넌트를 구현했어요',
            '쌓일 일정이 빈 칸에 잘 들어가도록 했어요! 🧱',
          ],
        },

        {
          id: 1003,
          type: 'detail',
          title: 'About',
          contents: [
            '웹도 앱처럼 페이지 전환 효과가 있다면 어떨까요?',
            '자연스러운 페이지 전환 효과를 만들었어요.',
          ],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },

        {
          id: 1004,
          type: 'outro',
          title: '🔗',
          contents: ['제 코드가 궁금한가요?', '반가워요. 놀러와요! 👋🏻'],
          links: [
            {
              url: 'https://velog.io/@young_pallete',
              iconSrc: '/profile.gif',
            },
          ],
        },
      ],
    },

    {
      id: 2,
      title: 'Vue 디자인 시스템 구축',
      period: {
        start: '2022.05',
        end: '진행 중',
      },
      thumbnailImage: '/profile.gif',

      contents: [
        {
          type: 'intro',
          title: '💡',
          id: 1000,
          skills: ['Vue3', 'Storybook'],
          contents: ['Vue 3로 다양한 컴포넌트를 만들었어요.', '한 번 탭들을 눌러 살펴볼까요?'],
        },

        {
          type: 'detail',
          title: 'Carousel',
          id: 1001,
          skills: ['Vue3', 'Storybook'],
          contents: ['Carousel을 구현했어요.'],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },

        {
          type: 'detail',
          title: 'Menu',
          id: 1002,
          skills: ['Vue3', 'Storybook'],
          contents: ['뷰포트에 따라 유기적으로 동작하는 메뉴를 만들었어요.'],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },
        {
          type: 'outro',
          title: '🔗',
          id: 1003,
          contents: ['제 코드가 궁금한가요?', '반가워요. 놀러와요! 👋🏻'],
          links: [
            {
              url: 'https://velog.io/@young_pallete',
              iconSrc: '/profile.gif',
            },
          ],
        },
      ],
    },

    {
      id: 3,
      title: 'See You Letter',
      period: {
        start: '2022.11',
        end: '진행 중',
      },
      thumbnailImage: '/profile.gif',

      contents: [
        {
          type: 'intro',
          title: '💡',
          id: 1000,
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
          contents: [
            '페이지를 만드는 페이지를 기획하고 있어요.',
            '현재 기획 단계에 있으며, 조만간 만날 계획이에요.',
            'See you later at See You Letter 👋🏻🖐🏻👋🏻',
          ],
          images: [
            {
              src: '/profile.gif',
              alt: '테스트',
              contents: '',
            },
          ],
        },
      ],
    },
  ]);

  const experiences: readonly ExperienceInterface[] = readonly([
    {
      id: 0,
      type: '스터디',
      title: '자바스크립트 스터디',
      period: {
        start: '2022.08',
        end: '2022.11',
      },

      images: ['/profile.gif'],

      skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
      contents: [
        '모던 자바스크립트 Deep Dive를 기반으로 4개월 간 진행',
        'Git 관리 전략 설계 및 문서화, 이슈 및 PR Template을 제작하여 자유로운 논의 제안',
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

      images: ['/profile.gif'],

      skills: ['Quasar', 'Vue', 'Tailwind CSS', 'AWS', 'Github Actions'],
      contents: [
        '고객 앱 반응형으로 제작 수행',
        'Git Flow로 Git History 전략 개선, CICD 자동화',
        '불안정한 패키지 및 Vue2 -> Vue3 마이그레이션 수행',
        '애플리케이션 랜딩 페이지 구현',
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

      images: ['/profile.gif'],

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

      images: ['/profile.gif'],

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
      ],
    },
  ]);

  const experienceRefs = useRef([]);
  experienceRefs.current = experiences.map((_, i) => experienceRefs.current[i] ?? createRef());

  const useExperienceRefsCallback = (idx: number) =>
    useRef<IntersectionObserverCallback>((entries) => {
      /**
       * @todo
       * [x] 마주칠 때 점이 보이도록 한다.
       * [ ] 점과 동시에 사진과 내용이 보이도록 한다.
       * [x] 스크롤을 올릴 때는 오히려 더 부자연스러울 수 있으니 변경사항이 없도록 무시하자.
       */

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(idx);
          // setNowPassedExperienceIndex((nowIndex) => Math.max(nowIndex, idx));
        }
      });
    });

  const experienceOptions = {
    rootMargin: '-200px',
    threshold: 1,
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

  const [perspective, setPerspective] = useState({ x: 0, y: 0 });
  const onMouseOver = throttle((e: MouseEvent) => {
    const { screenX, screenY } = e;

    const nextX = Math.min(Math.max(((1440 - screenX) / 1440) * 100));
    const nextY = Math.min(Math.max(((1024 - screenY) / 1024) * 100));

    setPerspective(() => ({ x: nextX, y: nextY }));
  }, 30);

  return (
    <StyledPage.Container>
      <StyledExperience.Container>
        <StyledExperience.TitleContainer>
          <Gummy texts="exper" delay={0} />
          <StyledExperience.ReverseText reversed={textReversed}>i</StyledExperience.ReverseText>
          <Gummy texts="ences" delay={0} />
        </StyledExperience.TitleContainer>

        <StyledExperience.LineContainer length={experienceRefs.current.length}>
          <StyledExperience.Line length={experienceRefs.current.length} />
          {experiences.map((nowExperience) => (
            <StyledExperience.ExperienceContainer key={nowExperience.id}>
              <StyledGitGraph.Container>
                <StyledGitGraph.Branch.Container>
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
          <StyledProject.Card1>
            <div>
              <Image src="/profile.gif" layout="fill" objectFit="contain" />
            </div>
          </StyledProject.Card1>
          <StyledProject.Card2>
            <div>
              <Image src="/profile.gif" layout="fill" objectFit="contain" />
            </div>
          </StyledProject.Card2>
          <StyledProject.Card3>
            <div>
              <Image src="/profile.gif" layout="fill" objectFit="contain" />
            </div>
          </StyledProject.Card3>
          <StyledProject.Card4>
            <div>
              <Image src="/profile.gif" layout="fill" objectFit="contain" />
            </div>
          </StyledProject.Card4>

          <StyledProject.BrowserContainer>
            <Browser projects={projects} nowIndex={-1} />
          </StyledProject.BrowserContainer>
        </StyledPage.Projects>
      </StyledExperience.Container>
    </StyledPage.Container>
  );
}

export default ExperiencesAndProjectsPage;
