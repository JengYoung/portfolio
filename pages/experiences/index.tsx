import { ExperienceCard } from '@components/Card';
import { CardsState, CardsStateValueType } from '@components/Card/Experience';
import { getBaseLayout } from '@components/layouts';
import styled from '@emotion/styled';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const ExpriencePage = () => {
  const [cardsState, setCardsState] = useState<CardsStateValueType[]>([
    CardsState.invisible,
    CardsState.invisible,
    CardsState.invisible,
  ]);

  const cardRefs = [useRef(null), useRef(null), useRef(null)];
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
      id: 2,
      type: '프로젝트',
      title: '웹 포트폴리오 사이트 구현',
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
  ];

  useIntersectionObserver(cardRefs[0], useCallbackRef(0), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[1], useCallbackRef(1), { threshold: 0.5 });
  useIntersectionObserver(cardRefs[2], useCallbackRef(2), { threshold: 0.5 });
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
