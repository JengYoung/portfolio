import { globalViewPort } from '@styles/globalTheme';

import { notNumberRegex } from '@utils/regexps/isOnlyNumberRegex';

export const isDesktopSize = (width: number) =>
  width >= +globalViewPort.desktopMin.replace(notNumberRegex, '');

export const isTabletSize = (width: number) =>
  width >= +globalViewPort.tabletMin.replace(notNumberRegex, '');

export const isMobileSize = (width: number) =>
  width <= +globalViewPort.mobileMax.replace(notNumberRegex, '');
