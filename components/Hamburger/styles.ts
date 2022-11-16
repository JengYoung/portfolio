import { css } from '@emotion/react';

import styled from '@emotion/styled';

import HamburgerLine from './hamburger-line.svg';

export const StyledHamburger = {
  Container: styled.button`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 0.875rem;

    padding: 0;
    margin: 0;
  `,
  LineContainer: styled.div<{ isActive: boolean }>`
    height: 2px;
    transition: transform 0.3s;
    ${({ isActive }) =>
      isActive &&
      css`
        &:nth-of-type(2) {
          opacity: 0;
        }
        &:first-of-type {
          transform: rotate(45deg);
          transform-origin: top left;
        }
        &:last-of-type {
          transform: rotate(-45deg);
          transform-origin: bottom left;
        }
      `}
  `,
  Line: styled(HamburgerLine)`
    display: block;
  `,
};
