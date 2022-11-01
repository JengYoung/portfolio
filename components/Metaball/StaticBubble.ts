import { getDist } from '@utils/math';

import { Bubble } from './Bubble';
import { StaticBubbleInterface, StaticBubbleStateInterface } from './types';

/**
 * @description
 * Bubble과 좀 다른 특성을 가진 컴포넌트가 필요해서, 이를 확장해서 추가했다.
 * `StaticBubble`의 특징은 다음과 같다.
 * 1. 목적 방향 존재
 * 2. 정적인 성질을 가짐
 *
 * 1. "목적 방향"이 존재한다.
 * `Bubble`이 이동하는 데 있어서 "자유성"을 가지고 있다면, 이 친구는 처음 받을 때부터 `destination`이 정해져 있어야 한다.
 *
 * 2. 목적지점까지는 동적이지만, 이후에는 정적이다.
 * 만약 목적지점까지 도착했다면, 더이상 이동하지 않는다.
 * 그렇기에, scale, opacity와 같은 상태가 필요하지 않다.
 */

export class StaticBubble extends Bubble implements StaticBubbleInterface {
  state: StaticBubbleStateInterface;

  #stickyWeight = 1.2;

  constructor({ ctx, x, y, r, v, to }: StaticBubbleInterface) {
    super({ ctx, x, y, r, v });

    this.state = {
      ctx,
      x,
      y,
      r,
      v,
      scale: 1,
      opacity: 1,
      isBurst: false,
      to,
    };
  }

  get to() {
    return this.state.to;
  }

  get stickyWeight() {
    return this.#stickyWeight;
  }

  /**
   * @description
   * 기존 Bubble과 달리, 다음 목적지와의 거리에 따라 렌더링합니다.
   * 정적인 특성에 맞춰, 도착 시 v는 0으로 바꿔줍니다.
   *
   * @returns boolean - 이후에도 애니메이션을 동작할 것인지를 결정합니다.
   */
  animate(): boolean {
    const dist = getDist(this.x, this.y, this.to.x, this.to.y);

    const nextX = this.x + this.v[0];
    const nextY = this.y + this.v[1];

    const nextDist = getDist(nextX, nextY, this.to.x, this.to.y);

    if (dist <= nextDist) {
      this.setState({
        x: this.to.x,
        y: this.to.y,
        v: [0, 0],
      });

      return false;
    }

    this.setState({
      x: nextX,
      y: nextY,
    });

    return true;
  }
}
