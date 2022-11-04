import React, { ForwardedRef } from 'react';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';

const MetaballCanvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: -9999;
`;

interface ForwardedCanvasPropsInterface {
  width: number;
  height: number;
}

interface CanvasPropsInterface extends ForwardedCanvasPropsInterface {
  canvasRef: CanvasRefType;
}

type CanvasRefType = ForwardedRef<HTMLCanvasElement | null>;

/**
 * @param { width, height, canvasRef }
 * 여기서 canvasRef는 forwardRef를 상위 컴포넌트에서 이미 수행하여 CanvasRefType을 받는 특이한 형태를 갖고 있다.
 *
 * @description
 * 기본적으로 Canvas는 Ref를 상위에서 사용해야 한다. 따라서, 이를 ref 타입으로 넘겨받아야 한다.
 * 이때, dynamic import로 받기 위해서는 ref로 주는 것이 아닌 다른 prop으로 넘겨주는 방식을 채택해야 한다.
 * 그것이 canvasRef를 받는 이유이다.
 */

function Canvas({ width, height, canvasRef }: CanvasPropsInterface) {
  return <MetaballCanvas ref={canvasRef} width={width} height={height} />;
}

Canvas.displayName = 'Canvas';

/**
 * @throw
 * React.forwardRef를 바로 받아야 한다는 것이 중요했다.
 * 나의 경우 canvas를 forwardRef로 감쌌는데, 이렇게 하면 제대로 ref를 가져오지 못한다.
 *
 * @see: https://github.com/vercel/next.js/issues/4957
 */
/* eslint-disable-next-line import/no-self-import */
export const DynamicCanvas = dynamic(import('@components/Metaball/Canvas'));

export const ForwardedCanvas = React.forwardRef(
  ({ width, height }: ForwardedCanvasPropsInterface, ref: CanvasRefType) => (
    <DynamicCanvas width={width} height={height} canvasRef={ref} />
  )
);

ForwardedCanvas.displayName = 'ForwardedCanvas';

export default Canvas;
