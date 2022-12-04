import React, { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  /**
   * Page-Enter은 IE에서만 작동.
   */
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />

        <meta name="description" content="웹 프론트엔드 개발자 황재영 포트폴리오" />
        <meta name="keyword" content="frontend web portfolio, 프론트엔드 웹 포트폴리오" />
        <meta name="author" content="황재영" />
        <meta name="copyright" content="황재영" />

        <meta httpEquiv="imagetoolbar" content="no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Script-Type" content="text/javascript" />
        <meta httpEquiv="Content-Style-Type" content="text/css" />
        <meta name="robots" content="noindex" />

        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="36x36" href="/favicons/android-icon-36x36.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicons/android-icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="72x72" href="/favicons/android-icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/android-icon-96x96.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicons/android-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
