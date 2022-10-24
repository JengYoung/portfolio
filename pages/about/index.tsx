import styled from '@emotion/styled';
import React from 'react';
import TransitionText from '../../components/Text/TransitionText';
import Canvas, { CanvasInterface } from '../../components/Metaball/Canvas';

import dynamic from 'next/dynamic';

const DynamicCanvas = dynamic(
  () => import('../../components/Metaball/Canvas'),
  {
    ssr: false,
  }
);

const AboutMeDescription = styled.div`
  margin-top: 1rem;
`;
const AboutPage = () => {
  return (
    <>
      <div>
        <TransitionText $delay={1} $size="xl">
          반가워요!
        </TransitionText>
        <TransitionText $delay={1} $size="xl">
          <strong>바닥</strong>을 지향하는 개발자 황재영입니다.
        </TransitionText>

        <AboutMeDescription>
          <TransitionText $delay={1} $size="md">
            알고 있는 것일수록 더욱 경계하고, 다시 지식을 쌓아 나갑니다.
          </TransitionText>
          <TransitionText $delay={2} $size="md">
            그렇게 언러닝하며 무너지기보다는, 오히려 몰랐던 것을 알게됨에
            감사해요. 🥰
          </TransitionText>
          <TransitionText $delay={3} $size="md">
            결국, <strong>인생은 거리가 아닌 방향</strong>이고,
          </TransitionText>
          <TransitionText $delay={4} $size="md">
            저는 또 한 걸음 더욱 성장하며 나아갈테니까요.
          </TransitionText>
        </AboutMeDescription>
      </div>
      <DynamicCanvas></DynamicCanvas>
    </>
  );
};

export default AboutPage;
