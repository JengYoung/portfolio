import styled from '@emotion/styled';
import React, { useState } from 'react';

import Image from 'next/image';

import { getBaseLayout } from '@components/layouts';

import Bubble from '@components/Bubble';
import CopyStyle from '@components/Text';

interface SkillInterface {
  name: string;
  src: string;
  checks: string[];
  relativeSkills: string[];
}

const Skills = {
  HTML5: 'HTML5',
  CSS3: 'CSS3',
  JavaScript: 'JavaScript',
  TypeScript: 'TypeScript',
  React: 'React',
  Vue3: 'Vue3',
  NextJS: 'NextJS',
  CSSInJS: 'CSS in JS',
  Storybook: 'Storybook',
  Quasar: 'Quasar',
  NodeJS: 'Node.js',
  AWS: 'AWS',
  YarnBerry: 'Yarn berry',
  CICD: 'CICD',
} as const;

const SkillsPage = () => {
  const [activeSkill, setActiveSkill] = useState<SkillInterface | null>(null);

  const onClick = (skill: SkillInterface) => {
    setActiveSkill(() => skill);
  };

  const skills: SkillInterface[] = [
    {
      name: Skills.HTML5,
      src: '/html.png',
      checks: [
        '주요 태그들이 의미하는 특성을 이해하고 있어요.',
        '효율적으로 구조를 짜고, 시멘틱하게 작성할 수 있어요.',
        'HTML의 파싱과정을 이해하고 있어요.',
      ],
      relativeSkills: [Skills.JavaScript, Skills.CSS3],
    },
    {
      name: Skills.CSS3,
      src: '/css3.png',
      checks: [
        'SCSS 구문을 사용할 수 있어요.',
        'CSS 개발 방법론(BEM, CMACSS, SMASS)를 알고 있어요.',
        'CSS 최적화의 중요성을 이해하고 리플로우를 최소화하려 노력해요.',
        'flex와 grid를 자유자재로 사용할 수 있어요.',
        '미디어 쿼리를 사용할 수 있어요.',
      ],
      relativeSkills: [Skills.JavaScript, Skills.HTML5, Skills.CSSInJS],
    },
    {
      name: Skills.JavaScript,
      src: '/javascript.png',
      checks: [
        'ES13까지 틈틈이 최근 ECMAScript의 동향을 파악하고 있어요.',
        'this, 클로저, 실행 컨텍스트 등의 전반적인 자바스크립트 동작을 이해해요.',
        'Canvas API를 다룰 수 있으며 JS에서 애니메이션을 핸들링할 수 있어요.',
      ],
      relativeSkills: [
        Skills.TypeScript,
        Skills.CSS3,
        Skills.HTML5,
        Skills.React,
        Skills.Vue3,
        Skills.CSSInJS,
        Skills.NextJS,
        Skills.Quasar,
        Skills.NodeJS,
      ],
    },
    {
      name: Skills.TypeScript,
      src: '/typescript.png',
      checks: [
        '프로젝트에서 타입스크립트를 다루는 데 어려움이 없어요.',
        '중복되는 인터페이스 구조 생성을 지양하고 타입의 재사용을 지향해요.',
        'any를 지양하며, type assertion을 남발하지 않아요.',
      ],
      relativeSkills: [Skills.JavaScript],
    },
    {
      name: Skills.React,
      src: '/react.png',
      checks: [
        '라이프사이클과 재조정 과정을 이해하고 있어요',
        '함수형 컴포넌트를 사용할 수 있어요',
        '커스텀 훅을 사용하여 재사용성을 높여요.',
        '전역 상태 관리의 원리를 이해하고 있어요.',
        'Redux를 사용할 수 있어요',
        '컴포넌트의 재사용을 지향하며 코드를 작성해요.',
      ],
      relativeSkills: [Skills.Vue3, Skills.NextJS, Skills.CSSInJS],
    },
    {
      name: Skills.Vue3,
      src: '/vue3.png',
      checks: [
        'Vue의 라이프사이클을 이해하고 있어요.',
        'Vue2와 최신 Vue3의 문법을 이해하고 있어요.',
        '레거시 코드를 Vue3로 마이그레이션한 경험이 있어요.',
        'Composition API로 재사용 가능한 코드를 작성할 수 있어요.',
        'Vuex와 Pinia를 다룰 수 있어요.',
        '컴포넌트의 재사용을 지향하며 코드를 작성해요.',
      ],
      relativeSkills: [Skills.Quasar, Skills.React],
    },
    {
      name: Skills.NextJS,
      src: '/nextjs.png',
      checks: [
        'CSR, SSR, SSG, ISR의 차이점을 이해하고 있어요.',
        'NextJS가 주는 여러 최적화를 다룰 수 있어요.',
      ],
      relativeSkills: [Skills.React],
    },
    {
      name: Skills.CSSInJS,
      src: '/emotion.png',
      checks: [
        '@emotion과 Styled-components를 사용할 수 있어요.',
        '무분별한 스타일 컴포넌트 생산이 아닌 합성을 통한 재사용을 지향해요.',
      ],
      relativeSkills: [Skills.React],
    },
    {
      name: Skills.Storybook,
      src: '/storybook.png',
      checks: [
        'React와 Vue에서 모두 처음부터 구성하고 사용할 수 있어요.',
        'Control을 이용하여 테스트할 수 있는 스토리북을 만들어요.',
      ],
      relativeSkills: [Skills.React, Skills.Vue3],
    },
    {
      name: Skills.Quasar,
      src: '/quasar.svg',
      checks: [
        'Quasar가 주는 컴포넌트, CSS 기능들을 이해하고 있어요',
        'Quasar 기반 반응형 웹을 구축한 경험을 갖고 있어요.',
        'Icongenie 등을 다룰 수 있으며, 하이브리드 앱 유지 보수 경험이 있어요.',
      ],
      relativeSkills: [Skills.Vue3],
    },
    {
      name: Skills.NodeJS,
      src: '/nodejs.png',
      checks: [
        'Express.js와 Koa.js를 사용해본 경험이 있어요',
        'Node.js의 이벤트 루프를 이해하고 있어요.',
        'REST API로 클라이언트와 통신하는 서버를 만들 수 있어요.',
      ],
      relativeSkills: [Skills.JavaScript],
    },
    {
      name: Skills.AWS,
      src: '/aws.png',
      checks: [
        'S3를 이용하여 스토리지 사용 및 정적 웹사이트를 호스팅할 수 있어요.',
        'CloudFront를 다룰 수 있어요.',
      ],
      relativeSkills: [Skills.CICD],
    },
    {
      name: Skills.YarnBerry,
      src: '/yarn.png',
      checks: [
        'npm이 가진 한계점과 yarn berry의 특성을 이해하고 있어요.',
        '워크스페이스를 나누어 모노레포로 프로젝트를 관리할 수 있어요.',
      ],
      relativeSkills: [Skills.CICD],
    },
    {
      name: Skills.CICD,
      src: '/github-actions.png',
      checks: [
        '클라이언트 훅과 서버 훅을 이해하고 있어요.',
        'Git hook을 기반으로 husky와 github-action을 다룰 수 있어요.',
        'AWS와 연동하여 배포 자동화를 할 수 있어요.',
      ],
      relativeSkills: [Skills.AWS, Skills.YarnBerry],
    },
  ];

  return (
    <Styled.Container>
      <Styled.Inner>
        {activeSkill && (
          <Styled.DetailBox>
            <Styled.Thumbnail>
              <Image
                objectFit="contain"
                src={activeSkill.src}
                alt="vercel"
                width={300}
                height={300}
              ></Image>
            </Styled.Thumbnail>

            <Styled.Description>
              <CopyStyle.MainCopy>{activeSkill.name}</CopyStyle.MainCopy>
              {activeSkill.checks.map((text) => (
                <CopyStyle.SubCopy key={text}>{text}</CopyStyle.SubCopy>
              ))}
            </Styled.Description>
          </Styled.DetailBox>
        )}

        <Styled.Bubbles>
          {skills.map((skill) => {
            return (
              <Styled.BubbleItem key={skill.name}>
                <Bubble
                  className={
                    skill.name === activeSkill?.name ||
                    activeSkill?.relativeSkills.includes(skill.name)
                      ? 'bubble--active'
                      : ''
                  }
                  onClick={() => onClick(skill)}
                >
                  {skill.name}
                </Bubble>
              </Styled.BubbleItem>
            );
          })}
        </Styled.Bubbles>
      </Styled.Inner>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.section`
    width: 100vw;
    height: 100vh;
  `,
  Inner: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: linear-gradient(#111, #752bed);
  `,
  DetailBox: styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
    padding: 0 10rem;
  `,
  Thumbnail: styled.div`
    flex-shrink: 0;
    margin-right: 5rem;
  `,
  Description: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Bubbles: styled.ul`
    position: fixed;
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2rem);
    padding: 1.25rem;
    margin: 0;
    overflow: hidden;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  `,
  BubbleItem: styled.li`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
  `,
};

SkillsPage.getLayout = getBaseLayout;

export default SkillsPage;
