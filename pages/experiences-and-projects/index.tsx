import { css } from '@emotion/react';
import React, { createRef, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Gummy from '@components/Text/Gummy';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

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
  LineContainer: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3072px;
    overflow: hidden;
  `,
  Line: styled.div`
    width: 1px;
    height: 2048px;
    background-color: ${({ theme }) => theme.colors.primary.light};
  `,
  Circle: styled.div<{ index: number }>`
    position: absolute;
    top: ${({ index }) => 1024 * index}px;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.primary.light};
    border-radius: 50%;
  `,
};

function ExperiencesAndProjectsPage() {
  const [textReversed, setTextReversed] = useState(false);

  useEffect(() => {
    setTextReversed(() => true);
  }, []);

  const experiences = [1, 2];

  const experienceRefs = useRef([]);
  experienceRefs.current = experiences.map((_, i) => experienceRefs.current[i] ?? createRef());

  const experienceRefsCallback = useRef(() => {
    /**
     * @todo
     * [ ] 마주칠 때 점이 보이도록 한다.
     * [ ] 점과 동시에 사진과 내용이 보이도록 한다.
     * [ ] 스크롤을 올릴 때는 오히려 더 부자연스러울 수 있으니 변경사항이 없도록 무시하자.
     */
  });

  const experienceOptions = {
    threshold: 1,
  };

  useIntersectionObserver(experienceRefs.current[0], experienceRefsCallback, experienceOptions);
  useIntersectionObserver(experienceRefs.current[1], experienceRefsCallback, experienceOptions);

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

        <StyledExperienceIntro.LineContainer>
          <StyledExperienceIntro.Circle ref={experienceRefs.current[0]} index={1} />
          <StyledExperienceIntro.Circle ref={experienceRefs.current[1]} index={2} />
          <StyledExperienceIntro.Line />
        </StyledExperienceIntro.LineContainer>
      </StyledExperienceIntro.Container>
    </StyledPage.Container>
  );
}

export default ExperiencesAndProjectsPage;
