import React, { useMemo, useRef } from 'react';

import styled from '@emotion/styled';

import { ForwardedCanvas } from '@components/Metaball';
import { GradientType } from '@components/Metaball/types';

import useMetaball from '@hooks/useMetaball';
import useWindow from '@hooks/useWindow';

import globalTheme from '@styles/globalTheme';

const Styled = {
  Page: styled.section`
    width: 100vw;
    background-color: white;
  `,
  Container: styled.section`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #fff;
  `,
  Inner: styled.section,
};
function AboutPage() {
  const { windowState } = useWindow(['innerWidth', 'innerHeight']);
  const minWidth = useMemo(() => Math.min(1440, windowState.innerWidth), [windowState.innerWidth]);
  const minHeight = useMemo(
    () => Math.min(1200, windowState.innerHeight),
    [windowState.innerHeight]
  );

  const initialGradientColors: GradientType = ['#fff', '#fff'];
  const metaballGradientColors: GradientType = [
    globalTheme.colors.primary.dark,
    globalTheme.colors.primary.light,
  ];

  const canvasRef = useRef(null);
  useMetaball({
    canvasRef,
    gradient: initialGradientColors,
    metaballGradient: metaballGradientColors,
    mainMetaball: {
      x: minWidth / 2,
      y: minHeight / 2,
      r: 250,
    },
    staticBubbles: [],
    options: {
      bubbleNum: 12,
      absorbBallNum: 5,
      canvasWidth: windowState.innerWidth,
      canvasHeight: minHeight,
    },
  });

  return (
    <Styled.Page>
      <Styled.Container>
        <ForwardedCanvas width={minWidth} height={1200} ref={canvasRef} />
      </Styled.Container>
    </Styled.Page>
  );
}

export default AboutPage;
