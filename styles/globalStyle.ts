import { css } from '@emotion/react';

import globalTheme from './globalTheme';

/** CHECKLIST
 * @todo
 * [ ] 라이트 모드와 다크 모드에 따라 적용될 색을 각각 지정해주도록 한다.
 */
const globalStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Noto Sans KR, sans-serif;

    @media screen and (max-width: ${globalTheme.viewPort.tabletMax}) {
      font-size: 10px;
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

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: ${globalTheme.colors.background.darkmode};
    }
    body {
      color: ${globalTheme.colors.white};
      background: ${globalTheme.colors.background.darkmode};
    }
  }

  @media (prefers-color-scheme: light) {
    html {
      color-scheme: ${globalTheme.colors.background.darkmode};
    }
    body {
      color: ${globalTheme.colors.white};
      background: ${globalTheme.colors.background.darkmode};
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default globalStyle;
