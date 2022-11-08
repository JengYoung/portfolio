import React, { useState } from 'react';

import styled from '@emotion/styled';

import Gummy from '@components/Text/Gummy';

interface BrowserProps {
  nowIndex: number;
}

const Styled = {
  Container: styled.section`
    /* position: absolute; */
    width: 600px;
    height: 480px;
    overflow: hidden;
    background: black;
    border-radius: 20px;
    box-shadow: 0px 8px 12px 4px rgba(0, 0, 0, 0.2);
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  Circles: styled.ul<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    height: 100%;

    padding: 0;

    padding-right: 1rem;
    padding-left: 1rem;
    background-color: ${({ theme }) => theme.colors.headerColor};
    border-bottom-right-radius: ${({ isActive }) => (isActive ? '10px' : 0)};
  `,
  Circle: styled.li`
    width: 0.75rem;
    height: 0.75rem;

    list-style: none;

    border-radius: 50%;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }

    &:first-of-type {
      background: red;
    }
    &:nth-of-type(2) {
      background: orange;
    }
    &:last-of-type {
      background: green;
    }
  `,
  TabsContainer: styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;

    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.headerColor};
  `,
  TabsInner: styled.div`
    position: relative;
    display: flex;

    height: 2rem;

    background-color: ${({ theme }) => theme.colors.white};

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;

      height: 0.5rem;

      content: '';

      background-color: ${({ theme }) => theme.colors.headerColor};
    }
  `,
  Tab: styled.div<{ isActive: boolean; isLeftActive: boolean; isRightActive: boolean }>`
    position: relative;
    display: flex;

    max-width: 5rem;
    padding: 0.5rem;
    padding-right: 0;

    background: black;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.white : theme.colors.headerColor};

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: ${({ isRightActive }) => (isRightActive ? '10px' : 0)};
    border-bottom-left-radius: ${({ isLeftActive }) => (isLeftActive ? '10px' : 0)};
  `,
  Separator: styled.div`
    width: 0.5rem;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.headerColor};
    border-bottom-left-radius: 10px;
  `,
  TabTitle: styled.div<{ isActive: boolean }>`
    width: 100%;
    height: 100%;

    padding-right: 0.5rem;

    overflow: hidden;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 1;

    color: ${({ theme }) => theme.colors.subPrimary};
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right: ${({ isActive }) => (isActive ? 0 : '1px solid black')};
  `,
  Toolbar: styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  BarDescription: styled.div`
    width: calc(100% - 1rem);
    height: 1.5rem;

    padding: 0 0.5rem;

    font-size: ${({ theme }) => theme.fontSizes.s};
    color: ${({ theme }) => theme.colors.subPrimary};

    background-color: #ccc;

    border-radius: 10px;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 5rem);
    background-color: ${({ theme }) => theme.colors.subPrimary};
    border-top: 1px solid #ddd;
  `,
  InitText: styled.div`
    font-size: ${({ theme }) => theme.heads[3].size};
    font-weight: ${({ theme }) => theme.heads[3].weight};
    color: ${({ theme }) => theme.colors.white};
    strong {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  `,
};

function Browser({ nowIndex }: BrowserProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onClick = (idx: number) => {
    setActiveIndex(() => idx);
  };
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Circles isActive={activeIndex === 0}>
          <Styled.Circle />
          <Styled.Circle />
          <Styled.Circle />
        </Styled.Circles>
        <Styled.TabsContainer>
          <Styled.TabsInner>
            {[1, 2, 3, 4].map((_, idx) => (
              <Styled.Tab
                key={_}
                onClick={() => onClick(idx)}
                isLeftActive={idx === activeIndex + 1}
                isRightActive={idx === activeIndex - 1}
                isActive={idx === activeIndex}
              >
                <Styled.TabTitle isActive={idx === activeIndex || idx === activeIndex - 1}>
                  {_}3214122134243242343
                </Styled.TabTitle>
              </Styled.Tab>
            ))}
            <Styled.Separator />
          </Styled.TabsInner>
        </Styled.TabsContainer>
      </Styled.Header>

      <Styled.Toolbar>
        <Styled.BarDescription>설명을 적습니다.</Styled.BarDescription>
      </Styled.Toolbar>

      <Styled.Body>
        {nowIndex === -1 && (
          <>
            <Styled.InitText>왼쪽의 프로젝트를</Styled.InitText>
            <Styled.InitText>
              <strong>
                <Gummy texts="클릭" delay={0} options={{ infinite: true, isGummy: true }} />
              </strong>
              해주세요!
            </Styled.InitText>
          </>
        )}
      </Styled.Body>
    </Styled.Container>
  );
}

export default Browser;
