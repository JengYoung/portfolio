import TextStyle from '@components/Text';
import TransitionText from '@components/Text/TransitionText';
import styled from '@emotion/styled';
import React from 'react';

const StyledIntroduction = styled.section`
  height: 100vh;
  opacity: 1;
`;

const SubCopy = styled.div`
  font-size: 1rem;
`;

const Introduction = () => {
  return (
    <StyledIntroduction>
      <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
        <TextStyle.MainCopy>
          <div>좋은 코드에는</div>
          <strong>이야기</strong>가 있다고 믿어요 🙆🏻
        </TextStyle.MainCopy>

        <TextStyle.Default>
          <div>한 줄의 빈약한 문장이 작품의 집중을 방해하듯</div>
          <div>사소한 UX라도 개선하며</div>
          <div>주석 하나라도 애정을 담아 작성합니다.</div>
          <div>유저도, 개발자도</div>
          <div>이해할 수 있는 이야기를 만들고자 노력합니다.</div>
        </TextStyle.Default>
      </TransitionText>
    </StyledIntroduction>
  );
};

export default Introduction;
