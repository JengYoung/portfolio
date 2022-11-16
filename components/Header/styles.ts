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
  Container: styled.div`
    position: fixed;
    top: 0;
    z-index: 9999;

    width: 100vw;

    margin: 0 auto;

    background: rgba(0, 0, 0, 0.5);
  `,

  Title: styled.div`
    flex-shrink: 0;

    margin-left: 1.5rem;

    font-size: ${({ theme }) => theme.fontSizes.s};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,

  Header: styled.header<{ isOpen: boolean }>`
    height: 2rem;

    margin-left: 1rem;

    transition: all 0.3s;

    ${CommonStyle.Header}
  `,
  Links: styled.ul`
    display: flex;

    padding: 0;
  `,
  LinkContainer: styled.li<{ isActive: boolean }>`
    margin-left: 1.5rem;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: white;

    cursor: pointer;

    ${({ isActive }) =>
      isActive &&
      css`
        color: #ffe600;
      `}
  `,
};
