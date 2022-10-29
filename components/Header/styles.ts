import CopyStyle from '@components/Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CommonStyle = {
  Header: css`
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
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

export const StyledIntro = {
  Header: styled.header`
    height: 2rem;

    background: #333;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    ${CommonStyle.Header}
  `,
  Circles: styled.ul`
    ${CommonStyle.Circles}
  `,
  Circle: styled.li`
    ${CommonStyle.Circle}
  `,
  Title: styled(CopyStyle.XSmall)`
    margin: 0 auto;
    color: #aaa;
  `,
};

export const StyledBase = {
  Header: styled.header<{ isScrollDown: boolean }>`
    transition: all 0.3s;

    height: 4rem;

    background: transparent;

    /* border-bottom: 1px solid #aaa; */

    background: rgba(256, 256, 256, 0.1);
    ${CommonStyle.Header}

    ${({ isScrollDown }) =>
      isScrollDown &&
      css`
        transform: translateY(-4rem);
      `}
  `,
  Links: styled.ul`
    display: flex;
    margin: 0;
    margin-left: auto;
    margin-right: 5rem;
    padding: 0;
  `,
  LinkContainer: styled.li<{ isActive: boolean }>`
    cursor: pointer;
    list-style: none;
    color: white;

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
