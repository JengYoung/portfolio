import globalTheme from '@styles/globalTheme';

import { notNumberRegex } from '@utils/regexps/isOnlyNumberRegex';

export const isDesktopSize = (width: number) =>
  width >= +globalTheme.viewPort.desktopMin.replace(notNumberRegex, '');

export const isTabletSize = (width: number) =>
  width >= +globalTheme.viewPort.tabletMin.replace(notNumberRegex, '');

export const isMobileSize = (width: number) =>
  width <= +globalTheme.viewPort.mobileMax.replace(notNumberRegex, '');
