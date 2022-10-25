import Bubble from '@components/Bubble';
import TextStyle from '@components/Text';
import TransitionText from '@components/Text/TransitionText';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

const StyledIntroduction = styled.section`
  position: relative;
  height: 100vh;
  background: linear-gradient(180deg, #1d142d 40%, #770084);

  &:nth-child(2n + 1) {
    background: linear-gradient(0deg, #1d142d 60%, #770084);
  }
  opacity: 1;
`;

const SubCopy = styled.div`
  font-size: 1rem;
`;

const Introduction = () => {
  return (
    <>
      <StyledIntroduction>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <div>좋은 코드에는</div>
            <strong>이야기</strong>가 있다고 믿어요 🙆🏻
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>한 줄의 빈약한 문장이 작품의 집중을 방해하듯</div>
            <div>사소한 UX라도 개선하며</div>
            <div>주석 하나라도 애정을 담아 작성해요.</div>
            <div>유저도, 개발자도</div>
            <div>이해할 수 있는 이야기를 만들고자 노력해요.</div>
          </TextStyle.Default>
        </TransitionText>
      </StyledIntroduction>

      <StyledIntroduction>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <strong>문서화</strong>를 지향해요
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>아무리 좋은 이야기라도</div>
            <div>줄거리 요약보다 이해하기 빠를 수 없다 생각해요.</div>
            <div>제가 구현했던, 생각했던 모든 과정들을</div>
            <div>기록으로 남겨놓아요.</div>
          </TextStyle.Default>
        </TransitionText>
      </StyledIntroduction>

      <StyledIntroduction>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          <TextStyle.MainCopy>
            <strong>호기심</strong>이 많아요
          </TextStyle.MainCopy>

          <TextStyle.Default>
            <div>재밌는 것을 보면 따라해요!</div>
            <div>물론 막히면 스트레스를 엄~청 많이 받지만</div>
            <div>구현했을 때 짜릿함 하나만으로도</div>
            <div>개발을 좋아하는 개발자입니다.</div>
          </TextStyle.Default>
        </TransitionText>
      </StyledIntroduction>
    </>
  );
};

export default Introduction;
