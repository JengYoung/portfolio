import { css } from '@emotion/react';

import { CustomTheme } from './globalTheme';

/** CHECKLIST
 * @todo
 * [ ] 라이트 모드와 다크 모드에 따라 적용될 색을 각각 지정해주도록 한다.
 */
const globalStyle = (theme: CustomTheme) => css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Noto Sans KR, sans-serif;

    @media screen and (max-width: ${theme.viewPort.tabletMax}) {
      font-size: 12px;
    }
  }

  #__next,
  body {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  p,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  html {
    color-scheme: ${theme.colors.background};
  }
  body {
    color: ${theme.colors.white};
    background: ${theme.colors.background};
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default globalStyle;
