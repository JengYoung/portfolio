import { getDist, getRandom } from '@utils/math';

import { Metaball } from './Metaball';
import {
  BubbleOptions,
  BubblePropInterface,
  BubbleStateInterface,
  MetaballBaseInterface,
} from './types';

export class Bubble extends Metaball {
  maxScale: number;

  state: BubbleStateInterface;

  options: BubbleOptions;

  #stickyWeight = 1.1;

  #burstWeight = 1.2;

  constructor({ ctx, x, y, r, v, options = { burst: true } }: BubblePropInterface) {
    super({ ctx, x, y, r, v });

    this.maxScale = 1.1;

    this.options = options;

    this.state = {
      ctx,
      x,
      y,
      r,
      v,
      scale: 1,
      opacity: 1,
      isBurst: false,
    };
  }

  get stickyWeight() {
    return this.#stickyWeight;
  }

  get burstWeight() {
    return this.#burstWeight;
  }

  get scale() {
    return this.state.scale;
  }

  get opacity() {
    return this.state.opacity;
  }

  get isBurst() {
    return this.state.isBurst;
  }

  burst(base: Omit<MetaballBaseInterface, 'r'>) {
    if (this.scale >= this.maxScale) {
      const nextY = -getRandom(0.3, 1, { allowNagative: true });
      const nextX = (nextY < -0.5 ? -1 : 1) * getRandom(0.3, 1, { allowNagative: true });

      this.setState({
        x: base.x,
        y: base.y,
        r: getRandom(50, 100, { allowNagative: false }),
        v: [nextX, nextY],
        scale: 1,
        opacity: 1,
        isBurst: false,
      } as BubbleStateInterface);

      return;
    }

    const nextScale = this.scale * 1.01;
    const nextOpacity = this.opacity * 0.9;

    this.setState({
      ...this.state,
      r: this.r * nextScale,
      scale: nextScale,
      opacity: nextOpacity,
    } as BubbleStateInterface);
  }

  setState(state: Partial<BubbleStateInterface>) {
    super.setState(state);
  }

  animate(base: MetaballBaseInterface): void {
    if (this.isBurst) {
      this.burst({ x: base.x, y: base.y });
      return;
    }

    const { x: bx, y: by, r: br } = base;

    const maxDist = (this.r + br) * this.burstWeight;

    const dist = getDist(this.x, this.y, bx, by);

    if (dist >= maxDist) {
      if (this.options.burst) {
        this.setState({
          isBurst: true,
        });
        return;
      }
      this.setState({
        x: this.x + this.v[0],
        y: this.y + this.v[1],
      });
    }

    if (dist < maxDist) {
      this.setState({
        x: this.x + this.v[0],
        y: this.y + this.v[1],
      });
    }
  }

  render(ctx: CanvasRenderingContext2D, startAngle: number = 0, endAngle: number = Math.PI * 2) {
    ctx.save();

    ctx.globalAlpha = this.opacity;

    super.render(ctx, startAngle, endAngle);

    ctx.restore();
  }
}
