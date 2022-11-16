import { css } from '@emotion/react';

import styled from '@emotion/styled';

import CopyStyle from '@components/Text';

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
  `,

  Header: styled.header<{ isScrollDown: boolean }>`
    height: 3rem;
    margin: 0 auto;

    background: transparent;

    /* border-bottom: 1px solid #aaa; */

    background: black;
    transition: all 0.3s;
    ${CommonStyle.Header}

    ${({ isScrollDown }) =>
      isScrollDown &&
      css`
        transform: translateY(-4rem);
      `}
  `,
  Links: styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    margin-right: 5rem;
    margin-left: auto;
  `,
  LinkContainer: styled.li<{ isActive: boolean }>`
    color: white;
    list-style: none;
    cursor: pointer;

    &:hover {
      background: black;
    }

    &:not(:last-of-type) {
      margin-right: 3em;
    }

    ${({ isActive }) =>
      isActive &&
      css`
        color: #ffe600;
      `}
  `,
  Title: styled(CopyStyle.XSmall)`
    color: #aaa;
  `,
};
