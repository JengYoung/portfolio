import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CommonCommit = styled.div`
  position: absolute;
  top: -1.5rem;
  left: -1.5rem;
  display: flex;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary.light};
`;

const CommonBranch = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border: 2px solid ${({ theme }) => theme.colors.success};
`;

export const Branch = {
  Container: styled.div<{ draw: boolean; shouldShowHistory: boolean }>`
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s;

    ${({ draw, shouldShowHistory }) =>
      draw &&
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
  MergedBranch: styled(CommonBranch)`
    border-bottom: 0;
    border-left: 0;
    border-top-right-radius: 5rem;
  `,

  BasedBranch: styled(CommonBranch)`
    border-top: 0;
    border-left: 0;
    border-bottom-right-radius: 5rem;
  `,
  MergedCommit: styled(CommonCommit)`
    top: -1.5rem;
    left: -1.5rem;
  `,
  BasedCommit: styled(CommonCommit)`
    top: 1.5rem;
    left: -1.5rem;
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
    justify-items: flex-end;
    width: 100%;
    font-size: ${({ main, theme }) => (main ? theme.fontSizes.xxl : theme.fontSizes.l)};
    font-weight: ${({ main, theme }) => (main ? theme.heads[4].weight : theme.fontWeights.default)};
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
