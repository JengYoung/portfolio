import { CustomTheme } from '@styles/globalTheme';

/**
 * @see: https://emotion.sh/docs/typescript#define-a-theme
 */
declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
