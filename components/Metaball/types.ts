/**
 * Common Type
 */
export type GradientType = readonly [string, string];

/**
 * Canvas Interface
 */
export interface CanvasInterface {
  width: number;
  height: number;
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

/**
 * StaticBubble Interface
 */

export interface ToInterface {
  x: number;
  y: number;
}

export interface StaticBubbleInterface extends BubblePropInterface {
  to: ToInterface;
}

export interface StaticBubbleStateInterface extends BubbleStateInterface {
  to: ToInterface;
}
