import styled from '@emotion/styled';
import React from 'react';
import TransitionText from '@components/Text/TransitionText';

import dynamic from 'next/dynamic';
import Introduction from './Introduction';

const DynamicCanvas = dynamic(
  () => import('@components/Metaball').then((module) => module.Canvas),
  {
    ssr: false,
  }
);

const Greet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const AboutPage = () => {
  return (
    <>
      <Greet>
        <TransitionText $delay={1} $size="xxl" $fontWeight="extrabold">
          안녕하세요! 🖐🏻
        </TransitionText>
        <TransitionText $delay={1} $size="xl">
          웹 프론트엔드 개발자
        </TransitionText>
        <TransitionText $pending={1000} $delay={1} $size="xl">
          <strong>황재영</strong>입니다.
        </TransitionText>
      </Greet>

      <Introduction></Introduction>

      <DynamicCanvas></DynamicCanvas>
    </>
  );
};

export default AboutPage;
