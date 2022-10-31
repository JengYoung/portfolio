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
}

const ExperienceCard = (
  { period, skills, contents, state }: ExperienceCardProps,
  ref: MutableRefObject<HTMLElement>
) => {
  return (
    <Styled.Container state={state}>
      <Styled.Title>{state}</Styled.Title>
      <div>
        <CopyStyle.SubCopy>기간</CopyStyle.SubCopy>
        {period}

        <CopyStyle.SubCopy>사용기술</CopyStyle.SubCopy>
        <Styled.Tags>
          {skills.map((skill) => (
            <Styled.Tag key={skill}>{skill}</Styled.Tag>
          ))}
        </Styled.Tags>

        <CopyStyle.SubCopy>내용</CopyStyle.SubCopy>
        <Styled.List>
          {contents.map((content) => (
            <Styled.Description key={content}>{content}</Styled.Description>
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

    padding: 2rem;
    color: black;
    background: white;

    border: 1px solid #fff;
    border-radius: 20px;
    transition: all 1s;
    transform: scale(0);

    ${({ state }) => {
      switch (state) {
        case CardsState.invisible: {
          return css`
            opacity: 0;
            transform: scale(0);
          `;
        }

        case CardsState.visible: {
          return css`
            opacity: 1;
            transform: scale(1);
          `;
        }

        case CardsState.out: {
          return css`
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
  Title: styled(CopyStyle.MainCopy)`
    margin-bottom: 2rem;
    color: black;
  `,
  List: styled.ul`
    padding: 0;
    margin: 0;
  `,
  Description: styled.li`
    padding: 0;
    margin: 0;
    list-style: none;
  `,
  Tags: styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
  `,
  Tag: styled.div`
    padding: 0.5rem 0.75rem;
    background: #ddd;
    border-radius: 1rem;
  `,
};

export default ExperienceCard;
