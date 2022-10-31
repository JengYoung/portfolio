import React, { MutableRefObject } from 'react';
import styled from '@emotion/styled';

import CopyStyle from '@components/Text';
import { css } from '@emotion/react';

export enum CardsState {
  invisible = 'invisible',
  visible = 'visible',
  out = 'out',
}

export type CardsStateValueType = keyof typeof CardsState;

interface ExperienceCardProps {
  period: string;
  skills: string[];
  contents: string[];
  state: CardsStateValueType;
  title: string;
}

const ExperienceCard = (
  { period, skills, contents, state, title }: ExperienceCardProps,
  ref: MutableRefObject<HTMLElement>
) => {
  return (
    <Styled.Container state={state}>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Period>🗓 {period}</Styled.Period>
      </Styled.Header>
      <div>
        <Styled.SubCopy>사용기술</Styled.SubCopy>
        <Styled.Tags>
          {skills.map((skill) => (
            <Styled.Tag key={skill}>{skill}</Styled.Tag>
          ))}
        </Styled.Tags>

        <Styled.SubCopy>내용</Styled.SubCopy>
        <Styled.List>
          {contents.map((content) => (
            <Styled.Description
              key={content}
            >{`- ${content}`}</Styled.Description>
          ))}
        </Styled.List>
      </div>
    </Styled.Container>
  );
};
const Styled = {
  Container: styled.article<{ state: CardsStateValueType }>`
    position: absolute;

    width: 500px;
    height: 500px;

    padding: 1rem 2rem;
    color: black;
    background: white;

    border: 1px solid #fff;
    border-radius: 20px;
    transform: scale(0);

    ${({ state }) => {
      switch (state) {
        case CardsState.invisible: {
          return css`
            opacity: 0;
            transition: transform 1s;
            transform: scale(0);
          `;
        }

        case CardsState.visible: {
          return css`
            opacity: 1;
            transition: transform 1s;
            transform: scale(1);
          `;
        }

        case CardsState.out: {
          return css`
            opacity: 1;
            transition: transform 1s;
            transform: translateZ(5400px) translateX(-100vw) scale(1);
          `;
        }

        default: {
          return '';
        }
      }
    }}
  `,
  Header: styled.header`
    display: flex;
    align-items: baseline;
  `,
  Title: styled(CopyStyle.XLarge)`
    margin-right: 0.5rem;
    color: black;
  `,
  Period: styled.span`
    color: #888;
  `,
  SubCopy: styled(CopyStyle.Default)`
    font-weight: bold;
    color: black;

    &:not(:first-child) {
      margin-top: 1rem;
    }
  `,
  List: styled.ul`
    padding: 0;
    margin: 0;
  `,
  Description: styled.li`
    padding: 0;
    margin: 0.25rem 0;
    list-style: none;
  `,
  Tags: styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  `,
  Tag: styled.div`
    flex-shrink: 0;
    padding: 0.25rem 0.75rem;
    margin: 0.125rem;
    font-size: 0.75rem;
    color: white;
    background: #333;
    border-radius: 1rem;
  `,
};

export default ExperienceCard;
