import CopyStyle from '@components/Text';
import styled from '@emotion/styled';
import React from 'react';

import { StyledIntro } from '.';

const Header = () => {
  return (
    <StyledIntro.Header>
      <StyledIntro.Circles>
        <StyledIntro.Circle></StyledIntro.Circle>
        <StyledIntro.Circle></StyledIntro.Circle>
        <StyledIntro.Circle></StyledIntro.Circle>
      </StyledIntro.Circles>
      <StyledIntro.Title>
        JengYoung@github.com-FrontEndDeveloper:~/portfolio
      </StyledIntro.Title>
    </StyledIntro.Header>
  );
};

export default Header;
