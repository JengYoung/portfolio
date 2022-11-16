import { css } from '@emotion/react';

import styled from '@emotion/styled';

const CommonStyle = {
  Header: css`
    display: flex;
    align-items: center;

    max-width: 1440px;
  `,
  Circles: css`
    position: absolute;

    display: flex;

    padding: 0;
    margin: 0;
    margin-left: 1rem;
  `,
  Circle: css`
    width: 1rem;
    height: 1rem;

    list-style: none;

    border-radius: 50%;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }

    &:first-of-type {
      background: red;
    }
    &:nth-child(2) {
      background: orange;
    }
    &:last-of-type {
      background: green;
    }
  `,
};

export const StyledBase = {
  Container: styled.div<{ isOpened: boolean }>`
    position: fixed;
    top: 0;
    z-index: 9999;

    width: 100vw;
    height: 2rem;

    margin: 0 auto;

    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    ${({ isOpened }) =>
      isOpened &&
      css`
        display: flex;
        height: 10rem;
      `}
  `,

  Title: styled.div<{ isOpened: boolean }>`
    flex-shrink: 0;

    margin-left: 1.5rem;

    font-size: ${({ theme }) => theme.fontSizes.s};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    ${({ isOpened }) =>
      isOpened &&
      css`
        display: none;
      `}
  `,

  Header: styled.header<{ isOpened: boolean }>`
    width: 100%;
    height: 100%;

    margin-left: 1rem;

    transition: all 0.3s;

    ${CommonStyle.Header}
  `,
  Thumbnail: styled.div<{ isOpened: boolean }>`
    position: relative;

    width: 160px;
    height: 96px;
    margin-bottom: 0.5rem;

    ${({ isOpened }) =>
      !isOpened &&
      css`
        display: none;
      `}
  `,
  Links: styled.ul<{ isOpened: boolean }>`
    display: flex;

    padding: 0;

    transition: all 0.3s;

    ${({ isOpened }) =>
      isOpened &&
      css`
        display: flex;
        align-items: flex-end;
        justify-content: space-evenly;
        width: 1000px;
        margin: 0 auto;
      `}
  `,
  LinkContainer: styled.li<{ isOpened: boolean; isActive: boolean }>`
    margin-left: 1.5rem;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: white;
    text-align: center;

    cursor: pointer;

    ${({ isActive }) =>
      isActive &&
      css`
        color: #ffe600;
      `}
    ${({ isOpened }) =>
      isOpened &&
      css`
        padding: 0.5rem;
        border: 2px solid transparent;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          transition: all 0.3s;
        }
      `} 
    ${({ isOpened, isActive, theme }) =>
      isActive &&
      isOpened &&
      css`
        border: 1px solid ${theme.colors.primary.light};
        border-radius: 20px;
      `}
  `,
};
