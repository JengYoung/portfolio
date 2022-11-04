import { css } from '@emotion/react';

import styled from '@emotion/styled';

export const TerminalHeaderHeight = '2rem';

export const StyledTerminal = {
  Container: styled.article`
    width: 800px;
    height: 540px;

    border-radius: 20px;

    overflow: hidden;
  `,
};

export const StyledTerminalHeader = {
  Header: styled.header`
    display: flex;
    align-items: center;

    height: ${TerminalHeaderHeight};

    background: ${({ theme }) => theme.colors.subPrimary};
  `,
  Circles: styled.ul`
    position: absolute;
    display: flex;

    padding: 0;

    margin: 0;
    margin-left: 1rem;
  `,
  Circle: styled.li`
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
    &:nth-of-type(2) {
      background: orange;
    }
    &:last-of-type {
      background: green;
    }
  `,
  Title: styled.div`
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.white};
  `,
};

const ArrowHeadCSS = (color: string) => css`
  border-left: 1rem solid ${color};
  border-top: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
`;

export const StyledBody = {
  Container: styled.div`
    width: 100%;
    min-width: 800px;
    height: calc(100% - ${TerminalHeaderHeight});

    padding: 1rem;

    background: ${({ theme }) => theme.colors.dark};
  `,
  EnterCommand: styled.span<{ isActive: boolean }>`
    animation: highlight-enter-command 1s infinite;
    animation-fill-mode: forwards;
    ${({ isActive, theme }) =>
      isActive &&
      css`
        color: ${theme.colors.success};
        animation: none;
      `}

    @keyframes highlight-enter-command {
      0% {
        color: ${({ theme }) => theme.colors.warning};
      }
      50% {
        color: ${({ theme }) => theme.colors.warning};
      }
      51% {
        color: ${({ theme }) => theme.colors.danger};
      }
      100% {
        color: ${({ theme }) => theme.colors.danger};
      }
    }
  `,
  InputLineContainer: styled.div`
    display: flex;
    position: relative;
  `,
  Arrows: styled.ul`
    position: relative;

    display: inline-flex;
    align-items: center;
  `,
  Arrow: styled.li<{ tailColor: string; color: string }>`
    position: relative;
    height: 1.5rem;

    padding-left: 1.5rem;
    padding-right: 0.5rem;

    background-color: ${({ color }) => color};

    &::before,
    &::after {
      content: '';
      position: absolute;
    }

    &::before {
      left: 0;

      ${({ tailColor }) => ArrowHeadCSS(tailColor)}
    }

    &::after {
      right: -1rem;

      ${({ color }) => ArrowHeadCSS(color)}
    }
  `,
  Command: styled.div`
    margin-left: 1.5rem;
  `,
  Cursor: styled.div<{ isActive: boolean }>`
    width: 0.75rem;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.white};
    display: ${({ isActive }) => (isActive ? 'none' : 'block')};
  `,
  Logs: styled.div<{ isActive: boolean }>`
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  `,
  LogType: styled.strong<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: ${({ theme }) => theme.fontWeights.default};
  `,
};
