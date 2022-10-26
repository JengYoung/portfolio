import React, {
  ForwardedRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
} from 'react';
import styled from '@emotion/styled';

import { Metaballs } from '.';

import useCanvas from '@hooks/useCanvas';
import { getRandom } from '@utils/math';
import dynamic from 'next/dynamic';

const MetaballCanvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: -9999;
`;

interface CanvasPropsInterface {
  width: number;
  height: number;
}

interface WrappedCanvasPropsInterface extends CanvasPropsInterface {
  ref: CanvasRefType;
  canvasRef: CanvasRefType;
}

type CanvasRefType = ForwardedRef<HTMLCanvasElement | null>;

const Canvas = React.forwardRef(
  ({ width, height }: CanvasPropsInterface, ref: CanvasRefType) => {
    return (
      <MetaballCanvas ref={ref} width={width} height={height}></MetaballCanvas>
    );
  }
);

Canvas.displayName = 'Canvas';

/**
 * @description
 * 기본적으로 Canvas는 Ref를 상위에서 사용해야 하므로 forwardRef로 wrapping하고 있다.
 * 따라서, 이를 ref 타입으로 넘겨받아야 한다.
 * 이때, dynamic import에서 받기 위해서는 ref로 주는 것이 아닌 다른 prop으로 넘겨주는 방식을 채택해야 한다.
 *
 * @error
 * 이를 다루는 데 주의사항이 있다.
 * 특이한 게, Dynamic import로 넘겨줄 때 canvasRef와 동시에, ref prop을 같은 ref로 넘겨주어야 한다.
 * 이는 `ref`를 dynamic import할 때 제대로 인자를 받지 못하는 현상이 있기 때문이다.
 *
 * @param WrappedCanvasPropsInterface
 *
 * @returns Canvas
 *
 * @see: https://stackoverflow.com/questions/63469232/forwardref-error-when-dynamically-importing-a-module-in-next-js
 */

export const WrappedCanvas = ({
  width,
  height,
  canvasRef,
}: WrappedCanvasPropsInterface) => {
  return <Canvas ref={canvasRef} width={width} height={height}></Canvas>;
};

export const DynamicCanvas = dynamic(
  () =>
    import('@components/Metaball/Canvas').then(
      (module) => module.WrappedCanvas
    ),
  {
    ssr: false,
  }
);

export default Canvas;
