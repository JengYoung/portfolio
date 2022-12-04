import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';

import { useRecoilState } from 'recoil';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ScrollMouse } from '@components/Mouse';
import { Terminal } from '@components/Terminal';
import { LogType, logColorsEnum } from '@components/Terminal/types';
import { getBaseLayout } from '@components/layouts';

import { useLocalStorage } from '@hooks/useLocalStorage';

import terminalData from '@assets/dataset/terminal.json';

import { CustomTheme } from '@styles/globalTheme';

import { IntroTarminalAtom } from '~/atoms';
import { TerminalModeType } from '~/atoms/intro/terminal';

const modeGradients = (theme: CustomTheme) => ({
  ANGRY: {
    start: '#FF0000',
    end: '#250864',
  },
  SHAKING: {
    start: '#FFD600',
    end: '#FF5C00',
  },
  null: {
    start: '#FFD600',
    end: '#FF5C00',
  },
  FULL_SCREEN: {
    start: theme.pages.intro.subBgColor.dark,
    end: theme.pages.intro.subBgColor.light,
  },
});

const Styled = {
  Page: styled.div<{ mode: TerminalModeType }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: calc(100vh + 4px);

    &::before,
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1000;

      content: '';
    }

    /* mode */
    &::before {
      ${({ theme, mode }) =>
        mode !== null &&
        css`
          background: linear-gradient(
            ${modeGradients(theme)[mode].start} 15%,
            ${modeGradients(theme)[mode].end} 85% 100%
          );
        `};
      opacity: ${({ mode }) => (mode === null ? 0 : 1)};
      transition: all 1s;
    }

    /* default */
    &::after {
      background: ${({ theme }) =>
        css`linear-gradient(${theme.pages.intro.subBgColor.dark} 15%, ${theme.pages.intro.subBgColor.light} 85% 100%)`};
      opacity: ${({ mode }) => (mode === null ? 1 : 0)};
      transition: all 1s;
    }
  `,
  Mouse: styled(ScrollMouse)`
    position: absolute;
    right: 50%;
    bottom: 0;
    left: 50%;
  `,
};

function HomePage() {
  const [{ mode }] = useRecoilState(IntroTarminalAtom);

  const { getItem, setItem } = useLocalStorage();
  const lastLoginDate = useRef('');

  const [isActive, setIsActive] = useState(false);

  const onCommand = (e: KeyboardEvent): any => {
    if (isActive || e.key !== 'Enter') return;

    setIsActive(() => true);
  };

  const onScroll = () => {
    if (isActive) return;

    setIsActive(() => true);
  };

  useEffect(() => {
    const GMT_AFTER_REMOVE_REGEX = /( GMT.*$)/g;
    lastLoginDate.current = getItem(
      'last-login',
      new Date().toString().replace(GMT_AFTER_REMOVE_REGEX, '')
    );

    window.addEventListener('keydown', onCommand, false);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      setItem('last-login', new Date().toString().replace(GMT_AFTER_REMOVE_REGEX, ''));

      window.removeEventListener('keydown', onCommand);
      window.removeEventListener('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>JengYoung&apos;s Portfolio 👋🏻</title>
        <meta property="og:type" content="portfolio" />
        <meta property="og:url" content="https://jengyoung.me" />
        <meta property="og:title" content="JengYoung's Portfolio 👋🏻" />
        <meta property="og:image" content="/ogs/og-image.png" />
        <meta
          property="og:description"
          content="반가워요! 저에 대해 알아볼 수 있는 포트폴리에오에요 👋🏻"
        />
        <meta property="og:site_name" content="JengYoung's Portfolio" />
        <meta property="og:locale" content="ko_KR" />
        <meta httpEquiv="Filename" content="index.html" />
      </Head>

      <Styled.Page mode={mode}>
        <Terminal
          delays={[0, 500, 0, 300, 0, 20, 0, 10, 0, 43]}
          data={terminalData as LogType<typeof logColorsEnum>[]}
          isActive={isActive}
          date={lastLoginDate.current}
        />
        <Styled.Mouse visible={!isActive} bottom="1rem" left="50%" right="50%" delay={0.3} />
      </Styled.Page>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  return {
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 300, // In seconds
  };
}

HomePage.getLayout = getBaseLayout;
