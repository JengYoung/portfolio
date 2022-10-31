import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

import { ExperienceCard } from '@components/Card';
import { CardsState, CardsStateValueType } from '@components/Card/Experience';
import { getBaseLayout } from '@components/layouts';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

const ExpriencePage = () => {
  const [cardsState, setCardsState] = useState<CardsStateValueType[]>([
    CardsState.invisible,
    CardsState.invisible,
    CardsState.invisible,
    CardsState.invisible,
    CardsState.invisible,
    CardsState.invisible,
  ]);

  const cardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const lastIntersecting = useRef(0);

  /**
   * [x] 카드의 상태를 업데이트하는 함수를 만든다.
   * TODO: 겹칠 경우
   * [x] 만약 inivisible이었으면 겹칠 경우 visible로 바꿔준다.
   * [x] 만약 out이었으면 겹칠 경우 visible으로 바꿔준다.
   
   * TODO: 겹치지 않았을 경우
   * [x] 만약 visible이었다면 out으로 바꿔준다.
   * [x] 이때, 스크롤을 위로 올리면 invisible이 되도록 한다.
   * [x] 이를 구현하기 위해, window.scrollY는 리플로우를 유발하므로 다른 방법을 고안한다. useRef를 이용하여 마지막 겹친 인덱스를 캐싱한다. 
   * [x] 다행히도 intersectionAPI는 스크롤에 대한 교차 시 호출 로직이 스크롤 방향에 따라 일정하다. 이를 이용하자.
   */
  const updateState =
    (idx: number, entry: IntersectionObserverEntry) =>
    (value: CardsStateValueType, cardsIndex: number) => {
      if (idx !== cardsIndex) return value;

      if (entry.isIntersecting) {
        lastIntersecting.current = idx;

        return CardsState.visible;
      } else {
        if (value === CardsState.visible) {
          return lastIntersecting.current >= idx
            ? CardsState.out
            : CardsState.invisible;
        }
      }

      return value;
    };

  const useCallbackRef = (idx: number) => {
    return useRef<IntersectionObserverCallback>((entries) => {
      entries.forEach((entry) => {
        setCardsState((state) => state.map(updateState(idx, entry)));
      });
    });
  };

  const dataset = [
    {
      id: 0,
      type: '프로젝트',
      title: '웹 포트폴리오 사이트',
      period: {
        start: '2022.10',
        end: '현재',
      },
      skills: [
        'Next.js',
        'React',
        'husky',
        'Github Action',
        '@emotion',
        'TypeScript',
        'AWS(S3, Route 53, CloudFront)',
        'yarn berry',
        'Canvas API',
      ],
      contents: [
        'SSG 기반 웹 포트폴리오 사이트 구축',
        '`Canvas API`로 메타볼 애니메이션 구현',
        '`translate3d`로 스크롤 시 3D 효과 구현',
        'CICD를 통한 린트, 배포, 릴리즈 노트 자동화 적용',
        '`Compound Composite` 디자인 패턴, `Custom Hook` 패턴 적용',
        '`yarn berry`를 통한 `zero install`로 빌드 및 배포 시간 단축',
      ],
    },

    {
      id: 1,
      type: '프로젝트',
      title: 'JS, React 유틸 라이브러리',
      period: {
        start: '2022.08',
        end: '현재',
      },
      skills: ['Vanilla JS', 'React', 'Three.js', 'yarn berry'],
      contents: [
        '재사용 가능한 애니메이션 및 유틸 라이브러리 제작.',
        '캘린더 컴포넌트 구현, `Todo` 쌓이는 로직 최적화',
        'Mobile App처럼 라우트 이동 전환 효과가 나오도록 하는 `Router Component` 구현',
        '`Three.js`로 3D 터널 애니메이션 구현',
        '`yarn`으로 다양한 환경에서의 구현을 분리하고 관리하고자 모노레포 구축',
      ],
    },

    {
      id: 2,
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
      id: 3,
      type: '프로젝트',
      title: 'Vue 디자인 시스템 구축',
      period: {
        start: '2022.05',
        end: '현재',
      },
      skills: ['Vue3', 'Storybook'],
      contents: [
        'Storybook으로 재사용, 테스트 가능한 컴포넌트 제작',
        'Carousel, Menu 등의 컴포넌트 구현',
        '복사, 입력, 삭제에 있어 커서 전환이 자연스러운 Formatter Input 컴포넌트 구현',
      ],
    },

    {
      id: 4,
      type: '스터디',
      title: '알고리즘 스터디',
      period: {
        start: '2021.09',
        end: '현재',
      },
      skills: ['Vue3', 'Storybook'],
      contents: [
        '프로그래머스 팀원들과 알고리즘 스터디 진행',
        '프로그래머스 기준 Lv1 ~ Lv4까지 진행 중',
        '현재까지도 진행 중이며, 개발 경험도 함께 공유하며 성장 중',
      ],
    },

    {
      id: 5,
      type: '교육',
      title:
        '프로그래머스 K-Digital Training 프론트엔드 엔지니어링 데브코스 1기',
      period: {
        start: '2021.09',
        end: '현재',
      },
      skills: ['Vue3', 'Storybook'],
      contents: [
        '이벤트 애플리케이션 개발(Everevent)',
        '11월 배움 기록왕 선정',
        '모각코 애플리케이션 개발(달리는 모각코)',
        '8월 이달의 스피커 선정',
      ],
    },
  ];

  useIntersectionObserver(cardRefs[0], useCallbackRef(0), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[1], useCallbackRef(1), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[2], useCallbackRef(2), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[3], useCallbackRef(3), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[4], useCallbackRef(4), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[5], useCallbackRef(5), { threshold: 0.5 });

  return (
    <>
      <Styled.Scene>
        {dataset.map((data) => (
          <ExperienceCard
            key={data.id}
            title={data.title}
            state={cardsState[data.id]}
            period={`${data.period.start} ~ ${data.period.end}`}
            skills={data.skills}
            contents={data.contents}
          ></ExperienceCard>
        ))}
      </Styled.Scene>
      <Styled.Container>
        <Styled.IntersectionTarget
          ref={cardRefs[0]}
        ></Styled.IntersectionTarget>
        <Styled.IntersectionTarget
          ref={cardRefs[1]}
        ></Styled.IntersectionTarget>
        <Styled.IntersectionTarget
          ref={cardRefs[2]}
        ></Styled.IntersectionTarget>
        <Styled.IntersectionTarget
          ref={cardRefs[3]}
        ></Styled.IntersectionTarget>
        <Styled.IntersectionTarget
          ref={cardRefs[4]}
        ></Styled.IntersectionTarget>
        <Styled.IntersectionTarget
          ref={cardRefs[5]}
        ></Styled.IntersectionTarget>
      </Styled.Container>
    </>
  );
};

ExpriencePage.getLayout = getBaseLayout;

const Styled = {
  Container: styled.section`
    width: 100%;
    height: 1600vh;
    /* padding-top: 4rem; */
    perspective: 10000px;
  `,
  IntersectionTarget: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  `,
  Scene: styled.section`
    position: fixed;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    perspective: 10000px;
  `,
};

export default ExpriencePage;
