import { keyframes } from '@emotion/react';

import { CustomTheme } from '..';

export const strokeTextLine = (theme: CustomTheme) => keyframes`
  0% {
    fill: transparent;
    stroke-dashoffset: 700;
  }
  70% {
    fill: ${theme.colors.primary.light};
  }
  100% {
    fill: ${theme.colors.primary.light};
    stroke-dashoffset: 0;
  }
`;
