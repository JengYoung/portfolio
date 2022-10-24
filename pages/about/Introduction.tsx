import TransitionText from '@components/Text/TransitionText';
import styled from '@emotion/styled';
import React from 'react';

const StyledIntroduction = styled.section`
  height: 100vh;
  opacity: 1;
`;

const Introduction = () => {
  return (
    <StyledIntroduction>
      <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
        <strong>저</strong>는 말이죠 👀
      </TransitionText>
    </StyledIntroduction>
  );
};

export default Introduction;
