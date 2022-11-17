import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';

import useWindow from './useWindow';

export interface UseCanvasParams {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  gradient?: readonly string[];
  baseFillColor?: string | CanvasGradient;
}

export interface UseCanvasReturnParams<T> {
  ctx: CanvasRenderingContext2D | null;
  setFillStyle: Dispatch<SetStateAction<CanvasGradient | null>>;
  windowState: T;
}

function useCanvas<T>({
  canvasRef,
  baseFillColor = '#000',
}: UseCanvasParams): UseCanvasReturnParams<T> {
  const { windowState, setWindowState } = useWindow<T>(['innerWidth', 'innerHeight']);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [fillStyle, setFillStyle] = useState<CanvasGradient | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;
    setCtx(() => (canvasRef.current as HTMLCanvasElement).getContext('2d'));

    window.addEventListener('resize', () => {
      setWindowState((state) => ({
        ...state,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      }));
    });
    // NOTE: 초기화할 때만 동작하도록 설정하였다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current !== null && ctx !== null) {
      ctx.fillStyle = fillStyle ?? baseFillColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    // NOTE: canvasRef는 ctx가 타입을 보장하므로 불필요한 반복 호출을 막기 위해 생략하였다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, baseFillColor, fillStyle]);

  return { ctx, setFillStyle, windowState };
}

export default useCanvas;
