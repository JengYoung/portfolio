import {RADIAN} from './constants';

/**
 * @descriptions
 * 두 점 간의 각도를 구하는 함수입니다.
 * 현재 대상 좌표를 앞에,
 * 비교할 대상을 뒤에 놓으면 됩니다.
 * 이는 `Math.atan2`를 응용하였습니다.
 *
 * @param x1 현재 대상 좌표 1의 x
 * @param y1 현재 대상 좌표 1의 y
 * @param x2 비교할 좌표 2의 x
 * @param y2 비교할 좌표 2의 y
 * @param degree 옵셔널하며, true일 경우에는 `degree`로 환산한 값을 반환합니다.
 *
 * @return 두 점 간의 각도를 반환합니다.
 */
const getAngle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  {degree = false}: {degree?: boolean},
) => Math.atan2(y1 - y2, x1 - x2) * (degree ? RADIAN : 1);

export default getAngle;
