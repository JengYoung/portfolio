import { useEffect } from 'react';

import { Metaballs } from '@components/Metaball';
import { MetaballBaseInterface, StaticBubbleInterface } from '@components/Metaball/types';

import useCanvas, { UseCanvasParams } from './useCanvas';

interface UseMetaballOptions {
  bubbleNum?: number;
  absorbBallNum?: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

interface UseMetaballParams extends UseCanvasParams {
  gradient: readonly [string, string];
  metaballGradient: readonly [string, string];

  mainMetaball: MetaballBaseInterface;
  staticBubbles?: Omit<StaticBubbleInterface, 'ctx'>[];
  options?: UseMetaballOptions;
}

const useMetaball = ({
  canvasRef,
  gradient,
  metaballGradient,
  baseFillColor = '#000',
  mainMetaball,
  staticBubbles,
  options,
}: UseMetaballParams) => {
  const { ctx, setFillStyle } = useCanvas({
    canvasRef,
    gradient,
    baseFillColor,
  });

  useEffect(() => {
    let frameId: number | null = null;

    if (ctx === null || canvasRef.current === null) return;

    const { bubbleNum, absorbBallNum, canvasWidth, canvasHeight } = options ?? {};

    const mainMetaballProp = {
      mainMetaballState: mainMetaball ?? {
        x: canvasRef.current.width / 2,
        y: canvasRef.current.height / 2,
        r: 100,
      },
      bubbleNum: bubbleNum ?? 4,
      absorbBallNum: absorbBallNum ?? 5,
      canvasWidth: canvasWidth ?? canvasRef.current.width,
      canvasHeight: canvasHeight ?? canvasRef.current.height,
      gradients: metaballGradient ?? ['#f200ff', '#9000ff'],
    };

    const metaballs = new Metaballs({
      ctx,
      ...mainMetaballProp,
    });

    const linearGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    if (!linearGradient) return;

    if (gradient) {
      gradient.forEach((nowGradient, idx) => {
        linearGradient?.addColorStop(idx, nowGradient);
      });
    }

    setFillStyle(() => linearGradient);

    if (staticBubbles) {
      staticBubbles.forEach((ballState) => {
        metaballs.createStaticBubbles({
          ...ballState,
          ctx,
        });
      });
    }

    const animate = () => {
      if (ctx === null || canvasRef.current === null) return;

      ctx.fillStyle = baseFillColor;
      ctx.save();

      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      metaballs.render(ctx);
      metaballs.animate();

      ctx.restore();
      if (frameId !== null) {
        requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId as number);
      frameId = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, canvasRef.current?.width, canvasRef.current?.height]);
};

export default useMetaball;
