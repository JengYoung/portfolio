import { isMobileSize } from '@utils/viewports';

export const getMainMetaball = (width: number, height: number) => ({
  x: width / 2,
  y: height * 0.7,
  r: isMobileSize(width) ? 110 : 150,
});
