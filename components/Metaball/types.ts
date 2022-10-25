import { Metaball } from '.';

export interface CanvasInterface {
  width: number;
  height: number;
}

/**
 * Metaballs Interface
 */
export interface MetaballsPropsInterface {
  ctx: CanvasRenderingContext2D;
  bubbleNum: number;
  absorbBallNum: number;
  canvasWidth: number;
  canvasHeight: number;
  gradients: [string, string];
}

export interface MetaballsInterface extends MetaballsPropsInterface {
  // balls: Metaball[];
  mainMetaball: Metaball;
}

/**
 * Metaball Interface
 */
export interface MetaballBaseInterface {
  x: number;
  y: number;
  r: number;
}

export interface MetaballPropInterface extends MetaballBaseInterface {
  ctx: CanvasRenderingContext2D;
  v: [number, number];
}

export interface MetaballStateInterface extends MetaballPropInterface {}

export interface MetaballInterface {
  state: MetaballStateInterface;
  stickyWeight: number;
}

export interface UpdateReturnTypeInterface {
  p1: [number, number];
  h1: [number, number];
  cmpH1: [number, number];
  cmpP1: [number, number];
  cmpP2: [number, number];
  cmpH2: [number, number];
  h2: [number, number];
  p2: [number, number];
}

/**
 * Bubble Interface
 */

export interface BubbleOptions {
  burst: true;
}
export interface BubblePropInterface extends MetaballPropInterface {
  options?: BubbleOptions;
}
export interface BubbleStateInterface extends MetaballStateInterface {
  scale: number;
  opacity: number;
  isBurst: boolean;
}
