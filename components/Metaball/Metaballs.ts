import { Bubble, Metaball } from '.';
import { MetaballsInterface, MetaballsPropsInterface } from './types';

import { getRandom } from '@utils/math';

export class Metaballs implements MetaballsInterface {
  ctx: CanvasRenderingContext2D;

  bubbleNum: number;

  absorbBallNum: number;

  mainMetaball: Metaball;

  canvasWidth: number;

  canvasHeight: number;

  gradients: [string, string];

  #bubbles: Bubble[] = [];

  #absorbedMetaBalls: Metaball[] = [];

  constructor({
    ctx,
    bubbleNum,
    absorbBallNum,
    canvasWidth,
    canvasHeight,
    gradients,
  }: MetaballsPropsInterface) {
    this.ctx = ctx;

    this.bubbleNum = bubbleNum;
    this.absorbBallNum = absorbBallNum;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.mainMetaball = new Metaball({
      ctx: this.ctx,
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2,
      r: 200,
      v: [
        getRandom(0, 1, { allowNagative: true }),
        getRandom(0, 1, { allowNagative: true }),
      ],
    });

    this.gradients = gradients;

    this.init();
  }

  init() {
    for (let i = 0; i < this.absorbBallNum; i += 1) {
      const metaball = new Metaball({
        ctx: this.ctx,
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        r: 200,
        v: [
          getRandom(0, 1, { allowNagative: true }),
          getRandom(0, 1, { allowNagative: true }),
        ],
      });

      this.#absorbedMetaBalls.push(metaball);
    }

    for (let i = 0; i < this.bubbleNum; i += 1) {
      const metaball = new Bubble({
        ctx: this.ctx,
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        r: getRandom(50, 100, { allowNagative: false }),
        v: [
          getRandom(0.3, 1, { allowNagative: true }),
          getRandom(0.3, 1, { allowNagative: true }),
        ],
      });

      this.#bubbles.push(metaball);
    }
  }

  get absorbedMetaBalls() {
    return this.#absorbedMetaBalls;
  }

  /**
   * @descriptions
   * mainMetaball을 제외한 나머지 메타볼들을 모두 합합니다.
   */
  get restMetaballs() {
    return [...this.#absorbedMetaBalls, ...this.#bubbles];
  }

  get bubbles() {
    return this.#bubbles;
  }

  gradient(gradients: [string, string]) {
    const result = this.ctx.createLinearGradient(
      0,
      0,
      0,
      this.ctx.canvas.height
    );

    gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  fillGradient() {
    const metaballGradiation = this.gradient(this.gradients);
    this.ctx.fillStyle = metaballGradiation;
  }

  animate() {
    console.log(this.restMetaballs, 'hi');
    this.restMetaballs.forEach((ball) => {
      ball.animate({
        x: this.mainMetaball.state.x,
        y: this.mainMetaball.state.y,
        r: this.mainMetaball.state.r,
      });
    });

    this.render(this.ctx);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.bubbles.forEach((ball, idx) => {
      if (ball.isBurst) {
        ball.burst();
      } else {
        const mainMetaballPath = ball.update(this.mainMetaball);
        if (mainMetaballPath !== null) ball.renderCurve(mainMetaballPath);

        for (let i = 0; i < this.absorbedMetaBalls.length; i += 1) {
          const nextBall = this.absorbedMetaBalls[i];

          const paths = ball.update(nextBall);
          if (paths !== null) ball.renderCurve(paths);
        }

        for (let i = idx + 1; i < this.bubbles.length; i += 1) {
          const nextBall = this.bubbles[i];
          if (!nextBall.isBurst) {
            // NOTE: update and render curve finally
            const paths = ball.update(nextBall);
            if (paths !== null) ball.renderCurve(paths);
          }
        }
      }

      ball.render(ctx);
    });

    this.absorbedMetaBalls.forEach((ball, idx) => {
      this.fillGradient();
      const mainMetaballPath = ball.update(this.mainMetaball);
      if (mainMetaballPath !== null) ball.renderCurve(mainMetaballPath);

      for (let i = idx + 1; i < this.absorbedMetaBalls.length; i += 1) {
        const nextBall = this.absorbedMetaBalls[i];

        // NOTE: update and render curve finally
        const paths = ball.update(nextBall);
        if (paths !== null) ball.renderCurve(paths);
      }

      ball.render(ctx);
    });

    this.mainMetaball.render(ctx);
  }
}
