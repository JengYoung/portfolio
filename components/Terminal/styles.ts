import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ButtonActionTypeEnum, TerminalModeType } from '~/atoms/intro/terminal';

export const TerminalHeaderHeight = '2rem';
export const StyledTerminal = {
  Container: styled.article<{ mode: TerminalModeType }>`
    width: 800px;
    height: 540px;

    overflow: hidden;

    border-radius: 20px;
    transition: all 0.5s;

    ${({ theme, mode }) => {
      if (mode === ButtonActionTypeEnum.red) {
        return css`
          transform: skew(-0.125turn, 40deg);
        `;
      }
      if (mode === ButtonActionTypeEnum.orange) {
        return css`
          transform: scale(0.95);
          animation: terminal-shaking 0.1s;
          animation-iteration-count: 9;

          @keyframes terminal-shaking {
            0% {
              transform: scale(0.95) translateX(0.5rem);
            }
            10% {
              transform: scale(0.95) translateX(0.5rem);
            }
          }
        `;
      }
      if (mode === ButtonActionTypeEnum.green) {
        return css`
          width: 100vw;
          height: 100vh;
          margin-top: ${theme.layout.header.height};
        `;
      }
      return ``;
    }}

    ${({ theme, mode }) =>
      theme &&
      css`
        @media screen and (max-width: ${theme.viewPort.tabletMax}) {
          width: calc(100vw - 2rem);
          height: calc(80vw);

          ${mode === ButtonActionTypeEnum.green &&
          css`
            width: 100vw;
            height: calc(100vh - ${theme.layout.header.height});
            margin-top: ${theme.layout.header.height};
          `}
        }
      `}
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
  border-top: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
  border-left: 1rem solid ${color};
`;

export const StyledBody = {
  Container: styled.div`
    width: 100%;
    min-width: 800px;
    height: calc(100% - ${TerminalHeaderHeight});

    padding: 1rem;

    background: ${({ theme }) => theme.colors.dark};
  `,
  EnterCommand: styled.div<{ isActive: boolean }>`
    word-wrap: break-word;
    animation: highlight-enter-command 1s infinite;
    animation-fill-mode: forwards;
    ${({ isActive, theme }) =>
      isActive &&
      css`
        color: ${theme.colors.success};
        animation: none;
      `};

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
    position: relative;
    display: flex;
  `,
  Arrows: styled.ul`
    position: relative;

    display: inline-flex;
    align-items: center;
  `,
  Arrow: styled.li<{ tailColor: string; color: string }>`
    position: relative;
    height: 1.5rem;
    padding-right: 0.5rem;

    padding-left: 1.5rem;

    background-color: ${({ color }) => color};

    &::before,
    &::after {
      position: absolute;
      content: '';
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
  Cursor: styled.div<{ isActive: boolean; delay: number }>`
    width: 0.75rem;
    height: 1.5rem;
    visibility: ${({ isActive }) => (isActive ? 'hidden' : 'visible')};

    background-color: ${({ theme }) => theme.colors.white};
    transition-delay: ${({ delay }) => delay}s;
  `,
  Logs: styled.ul<{ isActive: boolean }>`
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  `,
  Log: styled.li`
    display: none;

    &.log--visible {
      display: block;
    }
  `,
  LogType: styled.strong<{ color: string }>`
    font-weight: ${({ theme }) => theme.fontWeights.default};
    color: ${({ color }) => color};
  `,
};
