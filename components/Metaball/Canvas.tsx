import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { Metaballs } from '.';

import useCanvas from '@hooks/useCanvas';
import { getRandom } from '@utils/math';

const MetaballCanvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: -9999;
`;

const initialGradientColors: readonly string[] = ['#770084', '#1d142d'];

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ctx, setFillStyle } = useCanvas({
    canvasRef,
  });

  const width = window.innerWidth;
  const height = window.innerHeight;

  const animate = (metaballs: Metaballs, linearGradient: CanvasGradient) => {
    if (ctx === null) return;

    ctx.save();
    ctx.fillRect(0, 0, width, height);

    metaballs.render(ctx);
    metaballs.animate();

    ctx.restore();

    requestAnimationFrame(() => animate(metaballs, linearGradient));
  };

  useEffect(() => {
    if (ctx === null) return;

    const linearGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);

    if (!linearGradient) return;

    initialGradientColors.forEach((gradient, idx) => {
      linearGradient?.addColorStop(idx, gradient);
    });

    setFillStyle(() => linearGradient);

    const metaballs = new Metaballs({
      ctx,
      mainMetaballState: {
        x: width / 2,
        y: height / 2,
        r: 200,
      },
      bubbleNum: 4,
      absorbBallNum: 5,
      canvasWidth: width,
      canvasHeight: height,
      gradients: ['#f200ff', '#9000ff'],
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
