import React, { useEffect, useRef, useState } from 'react';
import useCanvas from '../../hooks/useCanvas';

const initialGradientColors: readonly string[] = ['#000000', '#200032'];

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ctx, setFillStyle } = useCanvas({
    canvasRef,
  });

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

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ctx]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
