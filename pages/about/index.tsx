import styled from '@emotion/styled';
import React, {
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
} from 'react';
import TransitionText from '@components/Text/TransitionText';

import dynamic from 'next/dynamic';
import Introduction from './Introduction';
import { Canvas, Metaballs } from '@components/Metaball';
import useCanvas from '@hooks/useCanvas';

const DynamicCanvas = dynamic(
  () => import('@components/Metaball').then((module) => module.Canvas),
  {
    ssr: false,
  }
);

const Greet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const initialGradientColors: readonly string[] = ['#770084', '#1d142d'];

const AboutPage = () => {
  const width = globalThis.innerWidth ?? 0;
  const height = globalThis.innerHeight ?? 0;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { ctx, setFillStyle } = useCanvas({
    canvasRef,
  });

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

      <DynamicCanvas
        width={width}
        height={height}
        canvasRef={canvasRef}
        ref={canvasRef}
      ></DynamicCanvas>
    </>
  );
};

export default AboutPage;
