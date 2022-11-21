import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CommonBranchInterface, GitGraphInterface } from './types';

export const Branch = {
  Container: styled.div<Omit<GitGraphInterface, 'nowExperience'>>`
    flex-shrink: 0;

    width: 100%;
    height: 100%;

    opacity: 0;

    transition: opacity 0.3s;

    ${({ shouldDraw, shouldShowHistory }) =>
      shouldDraw &&
      shouldShowHistory &&
      css`
        transform-origin: left;
        animation: scale-up 1s ease-out forwards;
        animation-delay: 0.25s;
        @keyframes scale-up {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}
  `,
  MergedCommitContainer: styled.div`
    position: relative;

    display: flex;
    align-items: flex-start;

    width: 100%;
    height: 3rem;
  `,

  Inner: styled.div<CommonBranchInterface>`
    position: relative;

    width: 3rem;
    height: 3rem;

    border: 2px solid ${({ theme }) => theme.colors.success};
    border-left: 0;

    ${({ type }) =>
      type === 'merged'
        ? css`
            border-bottom: 0;
            border-top-right-radius: 5rem;
          `
        : css`
            border-top: 0;
            border-bottom-right-radius: 5rem;
          `}
  `,

  Commit: styled.div<CommonBranchInterface>`
    position: absolute;
    left: -1.5rem;

    display: flex;

    line-height: 1;
    color: ${({ theme }) => theme.colors.primary.light};

    ${({ type }) =>
      type === 'merged'
        ? css`
            top: -1.5rem;
          `
        : css`
            top: 1.5rem;
          `}
  `,
};

export const History = {
  Container: styled.div`
    position: relative;

    display: flex;

    padding: 1rem 0;
    margin-left: calc(1.5rem + 2px);
  `,

  Dot: styled.div<{ main?: boolean; period?: string }>`
    position: relative;

    display: flex;
    flex-shrink: 0;

    width: ${({ main }) => `${main ? '3rem' : '2.5rem'}`};
    height: ${({ main }) => `${main ? '3rem' : '2.5rem'}`};

    margin-right: 0.75rem;

    background-color: ${({ main, theme }) =>
      main ? theme.colors.primary.light : theme.colors.success};

    border-radius: 50%;

    &:before {
      position: absolute;
      left: -6rem;
      z-index: 99;

      display: block;
      align-self: center;

      width: 5rem;

      text-align: right;
      content: '${({ period }) => period}';
    }
  `,
  CommitMessage: styled.span<{ main?: boolean }>`
    align-self: center;

    width: 100%;
    font-size: ${({ main, theme }) => (main ? theme.fontSizes.xxl : theme.fontSizes.l)};
    font-weight: ${({ main, theme }) => (main ? theme.heads[4].weight : theme.fontWeights.default)};

    ${({ main, theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        font-size: ${main ? theme.fontSizes.l : theme.fontSizes.default};
        font-weight: ${main ? theme.heads[4].weight : theme.fontWeights.default};
      }
    `}
  `,
  Line: styled.div`
    position: absolute;

    top: 0;
    bottom: 0;
    left: calc(1.5rem - 4px);

    border: 1px solid ${({ theme }) => theme.colors.success};
  `,
};

export const Styled = {
  Container: styled.article`
    display: flex;

    width: 100%;
    height: 100%;

    margin-left: 50%;
  `,
  Branch,
  History,
};
