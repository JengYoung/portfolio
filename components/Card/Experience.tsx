import CopyStyle from '@components/Text';
import styled from '@emotion/styled';
import React from 'react';

interface ExperienceCardProps {
  period: string;
  skills: string[];
  contents: string[];
}
const ExperienceCard = ({ period, skills, contents }: ExperienceCardProps) => {
  return (
    <Styled.Container>
      <Styled.Title></Styled.Title>
      <div>
        <CopyStyle.SubCopy>기간</CopyStyle.SubCopy>
        {period}

        <CopyStyle.SubCopy>사용기술</CopyStyle.SubCopy>
        <Styled.List>
          {skills.map((skill) => (
            <Styled.Tag key={skill}>{skill}</Styled.Tag>
          ))}
        </Styled.List>

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
  Container: styled.article`
    width: 100%;
    height: 100%;
    padding: 2rem;
    border: 1px solid #ddd;

    border-radius: 20px;
  `,
  Title: styled(CopyStyle.MainCopy)`
    margin-bottom: 2rem;
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
  Tag: styled.div`
    padding: 0.5rem 0.75rem;
    background: #ddd;
    border-radius: 1rem;
  `,
};
export default ExperienceCard;
