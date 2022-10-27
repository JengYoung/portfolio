import Bubble from '@components/Bubble';
import styled from '@emotion/styled';
import React from 'react';

const SkillsPage = () => {
  const skills = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'React',
    'Styled-components',
    'Storybook',
    'Jest',
    'Vue3',
    'Quasar',
    'GraphQL',
    'Node.js',
    'AWS',
    'Yarn berry',
    'Github-action',
  ];

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.Bubbles>
          {skills.map((skill, idx) => {
            return (
              <Styled.BubbleItem key={idx}>
                <Bubble>{skill}</Bubble>
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: linear-gradient(#111, #752bed);
  `,
  Bubbles: styled.ul`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap-reverse;
    width: 100%;
    height: 20rem;
  `,
  BubbleItem: styled.li`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
  `,
};

export default SkillsPage;
