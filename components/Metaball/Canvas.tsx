import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { Metaballs } from '.';

import useCanvas from '@hooks/useCanvas';

const MetaballCanvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: -1;
`;

const initialGradientColors: readonly string[] = ['#000000', '#200032'];

const Canvas = () => {
  console.log('HIHII');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ctx, setFillStyle } = useCanvas({
    canvasRef,
  });

  const width = window.innerWidth;
  const height = window.innerHeight;

  const animate = (metaballs: Metaballs, linearGradient: CanvasGradient) => {
    if (ctx === null) return;
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, width, height);
    metaballs.render(ctx);
    metaballs.animate();
    requestAnimationFrame(() => animate(metaballs, linearGradient));
  };

  useEffect(() => {
    const linearGradient = ctx?.createLinearGradient(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    ) as CanvasGradient;

    initialGradientColors.forEach((gradient, idx) => {
      linearGradient?.addColorStop(idx, gradient);
    });

    setFillStyle(() => linearGradient);

    const metaballs = new Metaballs({
      ctx: ctx as CanvasRenderingContext2D,
      bubbleNum: 4,
      absorbBallNum: 5,
      canvasWidth: width,
      canvasHeight: height,
      gradients: ['#5825ff', '#aa00ff'],
    });

    animate(metaballs, linearGradient);

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ctx]);

  return (
    <MetaballCanvas
      ref={canvasRef}
      width={width}
      height={height}
    ></MetaballCanvas>
  );
};

export default Canvas;
