import styled from '@emotion/styled';

import HamburgerLine from './hamburger-line.svg';

export const StyledHamburger = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 0.75rem;
  `,
  LineContainer: styled.div`
    height: 2px;
  `,
  Line: styled(HamburgerLine)`
    display: block;
  `,
};
