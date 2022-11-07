import { css } from '@emotion/react';
import React, { createRef, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Gummy from '@components/Text/Gummy';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import readonly from '@utils/readonly';

// interface ProjectInterface {
//   id: number;
//   type: string;
//   title: string;
//   period: {
//     start: string;
//     end: string;
//   };
//   skills: string[];
//   contents: string[];
// }

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

const EXPERIENCE_CIRCLE_INTERVAL_SIZE = 768;

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
  `,
};

const StyledExperienceIntro = {
  Container: styled(StyledPage.Inner)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary.dark};
  `,
  TitleContainer: styled.div`
    font-size: ${({ theme }) => `calc(${theme.fontSizes.max} * 4)`};
    font-weight: ${({ theme }) => theme.fontWeights.extrabold};
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
  LineContainer: styled.div<{ length: number }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${({ length }) => `${EXPERIENCE_CIRCLE_INTERVAL_SIZE * (length + 1)}px`};
    overflow: hidden;
  `,
  Line: styled.div<{ length: number }>`
    position: absolute;
    top: 0;
    width: 1px;
    height: ${({ length }) => `${EXPERIENCE_CIRCLE_INTERVAL_SIZE * length}px`};
    background-color: ${({ theme }) => theme.colors.primary.light};
  `,
  ExperienceContainer: styled.article`
    position: relative;
    top: 300px;
    display: flex;
    width: 100%;
    height: ${EXPERIENCE_CIRCLE_INTERVAL_SIZE}px;
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
    Start: styled.div`
      width: 3rem;
      height: 3rem;
      border: 2px solid ${({ theme }) => theme.colors.success};
      /* border-top: 0; */
      border-bottom: 0;
      border-left: 0;
      border-top-right-radius: 5rem;
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
    Dot: styled.div`
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.75rem;
      background-color: ${({ theme }) => theme.colors.success};
      border-radius: 50%;
    `,
    CommitMessage: styled.span`
      align-self: center;
      width: 100%;
      font-size: ${({ theme }) => theme.fontSizes.l};
      font-weight: ${({ theme }) => theme.fontWeights.default};
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

function ExperiencesAndProjectsPage() {
  const [textReversed, setTextReversed] = useState(false);
  // const [nowPassedExperienceIndex, setNowPassedExperienceIndex] = useState(-1);

  useEffect(() => {
    setTextReversed(() => true);
  }, []);

  // const projects: readonly ProjectInterface[] = readonly([
  //   {
  //     id: 0,
  //     title: '웹 포트폴리오 사이트',
  //     period: {
  //       start: '2022.10',
  //       end: '현재',
  //     },
  //     skills: [
  //       'Next.js',
  //       'React',
  //       'husky',
  //       'Github Action',
  //       '@emotion',
  //       'TypeScript',
  //       'AWS(S3, Route 53, CloudFront)',
  //       'yarn berry',
  //       'Canvas API',
  //     ],
  //     contents: [
  //       'SSG 기반 웹 포트폴리오 사이트 구축',
  //       '`Canvas API`로 메타볼 애니메이션 구현',
  //       '`translate3d`로 스크롤 시 3D 효과 구현',
  //       'CICD를 통한 린트, 배포, 릴리즈 노트 자동화 적용',
  //       '`Compound Composite` 디자인 패턴, `Custom Hook` 패턴 적용',
  //       '`yarn berry`를 통한 `zero install`로 빌드 및 배포 시간 단축',
  //     ],
  //   },

  //   {
  //     id: 1,
  //     title: 'JS, React 유틸 라이브러리',
  //     period: {
  //       start: '2022.08',
  //       end: '현재',
  //     },
  //     skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
  //     contents: [
  //       '재사용 가능한 애니메이션 및 유틸 라이브러리 제작.',
  //       '캘린더 컴포넌트 구현, `Todo` 쌓이는 로직 최적화',
  //       'Mobile App처럼 라우트 이동 전환 효과가 나오도록 하는 `Router Component` 구현',
  //       '`Three.js`로 3D 터널 애니메이션 구현',
  //       '`yarn`으로 다양한 환경에서의 구현을 분리하고 관리하고자 모노레포 구축',
  //     ],
  //   },

  //   {
  //     id: 2,
  //     title: 'Vue 디자인 시스템 구축',
  //     period: {
  //       start: '2022.05',
  //       end: '현재',
  //     },
  //     skills: ['Vue3', 'Storybook'],
  //     contents: [
  //       'Storybook으로 재사용, 테스트 가능한 컴포넌트 제작',
  //       'Carousel, Menu 등의 컴포넌트 구현',
  //       '복사, 입력, 삭제에 있어 커서 전환이 자연스러운 Formatter Input 컴포넌트 구현',
  //     ],
  //   },
  // ]);

  const experiences: readonly ExperienceInterface[] = readonly([
    {
      id: 0,
      type: '프론트엔드 개발자',
      title: '컨트롤클로더 프론트엔드 개발자',
      period: {
        start: '2022.01',
        end: '2022.08',
      },
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
      id: 1,
      type: '스터디',
      title: '자바스크립트 스터디',
      period: {
        start: '2022.08',
        end: '2022.11',
      },
      skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
      contents: [
        '모던 자바스크립트 Deep Dive를 기반으로 4개월 간 진행',
        'Git 관리 전략 설계 및 문서화, 이슈 및 PR Template을 제작하여 자유로운 논의 제안',
        '중간 과제를 통해 배운 지식들을 응용하는 문화 제안 및 조성',
        '주마다 Tech Blog에 탐구한 지식들 정리하여 게재',
      ],
    },

    {
      id: 2,
      type: '스터디',
      title: '알고리즘 스터디',
      period: {
        start: '2021.09',
        end: '현재',
      },
      skills: ['Vanilla JS'],
      contents: [
        '꾸준히 문제해결 능력을 기르고자 알고리즘 스터디 진행',
        '프로그래머스 기준 Lv1 ~ Lv4까지 진행 중',
        '현재까지도 진행 중이며, 개발 경험도 함께 공유하며 성장 중',
      ],
    },

    {
      id: 3,
      type: '교육',
      title: '프로그래머스 K-Digital Training 프론트엔드 엔지니어링 데브코스 1기',
      period: {
        start: '2021.07',
        end: '2021.11',
      },
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

  return (
    <StyledPage.Container>
      <StyledExperienceIntro.Container>
        <StyledExperienceIntro.TitleContainer>
          <Gummy texts="exper" delay={0} />
          <StyledExperienceIntro.ReverseText reversed={textReversed}>
            i
          </StyledExperienceIntro.ReverseText>
          <Gummy texts="ences" delay={0} />
        </StyledExperienceIntro.TitleContainer>

        <StyledExperienceIntro.LineContainer length={experienceRefs.current.length}>
          <StyledExperienceIntro.Line length={experienceRefs.current.length} />
          {experiences.map((nowExperience) => (
            <StyledExperienceIntro.ExperienceContainer key={nowExperience.id}>
              <StyledGitGraph.Container>
                <StyledGitGraph.Branch.Container>
                  <StyledGitGraph.Branch.Start />
                  {nowExperience.contents.map((content) => (
                    <StyledGitGraph.History.Container>
                      <StyledGitGraph.History.Dot />
                      <StyledGitGraph.History.CommitMessage>
                        {content}
                      </StyledGitGraph.History.CommitMessage>
                      <StyledGitGraph.History.Line />
                    </StyledGitGraph.History.Container>
                  ))}
                  <StyledGitGraph.Branch.End />
                </StyledGitGraph.Branch.Container>
              </StyledGitGraph.Container>
            </StyledExperienceIntro.ExperienceContainer>
          ))}
        </StyledExperienceIntro.LineContainer>
      </StyledExperienceIntro.Container>
    </StyledPage.Container>
  );
}

export default ExperiencesAndProjectsPage;
