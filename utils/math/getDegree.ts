import {RADIAN} from './constants';

/**
 * @descriptions : 라디안 값을 degree 값으로 변환합니다.
 *
 * @param r : 라디안 값을 인수로 전달받습니다.
 * @return degree값을 반환합니다.
 */
const getDegree = (r: number): number => r * RADIAN;

export default getDegree;
