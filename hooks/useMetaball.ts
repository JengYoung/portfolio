import { Metaballs } from '@components/Metaball';
import {
  MetaballBaseInterface,
  StaticBubbleInterface,
} from '@components/Metaball/types';
import { useEffect } from 'react';
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

  const animate = (metaballs: Metaballs, linearGradient: CanvasGradient) => {
    if (ctx === null || canvasRef.current === null) return;

    ctx.save();

    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    metaballs.render(ctx);
    metaballs.animate();

    ctx.restore();

    requestAnimationFrame(() => animate(metaballs, linearGradient));
  };

  useEffect(() => {
    if (ctx === null || canvasRef.current === null) return;

    const { width, height } = canvasRef.current;

    const { bubbleNum, absorbBallNum, canvasWidth, canvasHeight } =
      options ?? {};

    const mainMetaballProp = {
      mainMetaballState: mainMetaball ?? {
        x: width / 2,
        y: height / 2,
        r: 200,
      },
      bubbleNum: bubbleNum ?? 4,
      absorbBallNum: absorbBallNum ?? 5,
      canvasWidth: canvasWidth ?? width,
      canvasHeight: canvasHeight ?? height,
      gradients: metaballGradient ?? ['#f200ff', '#9000ff'],
    };

    const linearGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    if (!linearGradient) return;

    if (gradient) {
      gradient.forEach((gradient, idx) => {
        linearGradient?.addColorStop(idx, gradient);
      });
    }

    setFillStyle(() => linearGradient);

    const metaballs = new Metaballs({
      ctx,
      ...mainMetaballProp,
    });

    if (staticBubbles) {
      staticBubbles.forEach((ballState) => {
        metaballs.createStaticBubbles({
          ...ballState,
          ctx,
        });
      });
    }

    animate(metaballs, linearGradient);

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ctx]);
};

export default useMetaball;
