import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Styled = {
  Container: styled.section`
    width: 100%;
    height: 100%;

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

    ${({ theme, isRightActive, isLeftActive }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: ${isRightActive ? '5px' : 0};
        border-bottom-left-radius: ${isLeftActive ? '5px' : 0};
      }
    `}
  `,
  Separator: styled.div<{ isLeftActive: boolean }>`
    width: 0.5rem;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.headerColor};
    ${({ isLeftActive }) =>
      isLeftActive &&
      css`
        border-bottom-left-radius: 10px;
      `}
  `,
  TabTitle: styled.div<{ isActive: boolean }>`
    width: 5rem;
    height: 100%;

    padding-right: 0.5rem;

    overflow: hidden;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 1;

    color: ${({ theme }) => theme.colors.subPrimary};
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right: ${({ isActive }) => (isActive ? '1px solid transparent' : '1px solid #aaa')};
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
    display: flex;
    align-items: center;
    width: calc(100% - 1rem);
    height: 2rem;

    padding: 0 0.5rem;

    font-size: ${({ theme }) => theme.fontSizes.s};
    color: ${({ theme }) => theme.colors.subPrimary};

    background-color: #ccc;

    border-radius: 10px;
  `,
  Body: styled.div<{ intro: boolean }>`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: calc(100% - 5rem);

    background-color: ${({ intro, theme }) => theme.colors[intro ? 'subPrimary' : 'subPrimary']};

    border-top: 1px solid #ddd;

    video {
      position: absolute;
      top: 0;

      height: 100%;
    }
  `,
  BodyDescriptions: styled.ul`
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    min-height: 4.5rem;

    padding: 0.5rem 1rem;
    margin: 1rem 0;

    text-align: left;

    background-color: rgba(0, 0, 0, 0.5);

    border-radius: 10px;
    box-shadow: -2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  `,
  BodyDescription: styled.li`
    width: 100%;
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
