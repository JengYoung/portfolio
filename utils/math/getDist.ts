/**
 * @descriptions 한 좌표에 위치한 두 점 간의 거리를 반환합니다. 배열이 아님에 유의합시다.
 *
 * @param x1 좌표 1의 x
 * @param y1 좌표 1의 y
 * @param x2 좌표 2의 x
 * @param y2 좌표 2의 y
 *
 * @return 두 점 간의 거리를 반환합니다.
 */

const getDist = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

export default getDist;
