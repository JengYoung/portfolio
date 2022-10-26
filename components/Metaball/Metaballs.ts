import { Bubble, Metaball } from '.';
import {
  GradientType,
  MetaballsInterface,
  MetaballsPropsInterface,
  MetaballStateInterface,
  StaticBubbleInterface,
} from './types';

import { getRandom } from '@utils/math';
import { StaticBubble } from './StaticBubble';

export class Metaballs implements MetaballsInterface {
  ctx: CanvasRenderingContext2D;

  bubbleNum: number;

  absorbBallNum: number;

  mainMetaball: Metaball;

  canvasWidth: number;

  canvasHeight: number;

  gradients: GradientType;

  mainMetaballState: MetaballStateInterface;

  #staticBubbles: StaticBubble[] = [];

  #bubbles: Bubble[] = [];

  #absorbedMetaBalls: Metaball[] = [];

  constructor({
    ctx,
    mainMetaballState,
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

    this.mainMetaballState = {
      ...mainMetaballState,
      ctx,
      v: [0, 0],
    };

    this.mainMetaball = new Metaball(this.mainMetaballState);

    this.gradients = gradients;

    this.init();
  }

  /**
   * @deprecated
   * WARNING: 그러나 아직 사용할지도 모르니 프로젝트가 끝날 때까지 남겨놓자.
   *
   * 본래 목적은 rootState와 transform을 이용하여, 메타볼들을 요리조리 이동할 계획이였다.
   * 메타볼이 화면만큼 갑자기 확! 커지고, 작아지면서 또 다른 메타볼과 결합하는 과정을 만들면 기가막히겠다...라는 생각이었다.
   *
   * 그러나 이는 2시간의 고민 끝에, 내 오만함으로 결론을 지었다.
   * 생각해보니, 화면의 크기만큼 키우면서, 요리조리 연산해내는데, 그것을 스크롤에 따라서 결정하는 것이
   * 과연 클린한 동작을 위한 로직 대비 얼마나 효용가치가 있는지를 생각해보았는데, 형편 없었다.
   *
   * 지금 당장만 해도 맥북 14인치 기준 전체 화면 시 캔버스에서만 19MB의 메모리를 사용하고 있다.
   * 심지어 지금 컴포지션 단계에서 뭔가 문제가 있어 보여서... 거의 70MB 가량 사용하고 있다.
   *
   * 따라서 해당 애니메이션을 위한 매서드는 사용하지 않으려 하지만, 혹시나 나중에 기가 막힌 방법이 있다면 사용하려 놔둔다.
   * 일단 시급한 것들 구현하고, 최적화한 후에 좀 더 고민하련다. 그때 지우겠다.
   */
  get rootState() {
    return this.mainMetaball.state;
  }

  transform(xValue?: number, yValue?: number, rValue?: number) {
    [this.mainMetaball, ...this.absorbedMetaBalls].forEach((metaball) => {
      metaball.setState({
        x: metaball.x - (xValue ?? 0),
        y: metaball.y - (yValue ?? 0),
        r: metaball.r - (rValue ?? 0),
      });
    });
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

  get staticBubbles() {
    return this.#staticBubbles;
  }

  createStaticBubbles(prop: StaticBubbleInterface) {
    this.#staticBubbles.push(new StaticBubble(prop));
  }

  /**
   * @description
   * mainMetaball을 제외한 나머지 메타볼들을 모두 합합니다.
   */
  get restMetaballs() {
    return [
      ...this.#absorbedMetaBalls,
      ...this.#bubbles,
      ...this.#staticBubbles,
    ];
  }

  get bubbles() {
    return this.#bubbles;
  }

  gradient(gradients: GradientType) {
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
    this.fillGradient();

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

    this.staticBubbles.forEach((ball, idx) => {
      const mainMetaballPath = ball.update(this.mainMetaball);
      if (mainMetaballPath !== null) ball.renderCurve(mainMetaballPath);

      ball.render(ctx);
    });

    this.mainMetaball.render(ctx);
  }
}
