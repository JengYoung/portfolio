import styled from '@emotion/styled';

export const Styled = {
  Link: styled.a<{ width: string; height: string }>`
    position: relative;
    display: block;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: all 0.3s;

    &:hover,
    &:active {
      transform: scale(1.2);
    }
  `,
};
