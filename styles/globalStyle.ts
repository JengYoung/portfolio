import { css } from '@emotion/react';

import globalTheme from './globalTheme';

const globalStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Noto Sans KR, sans-serif;
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
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: ${globalTheme.colors.dark};
    }
    body {
      color: ${globalTheme.colors.white};
      background: ${globalTheme.colors.dark};
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default globalStyle;
