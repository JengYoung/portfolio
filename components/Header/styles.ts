import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CommonStyle = {
  Header: css`
    display: flex;
    align-items: center;

    max-width: 1440px;
  `,
  Circles: css`
    position: absolute;

    display: flex;

    padding: 0;
    margin: 0;
    margin-left: 1rem;
  `,
  Circle: css`
    width: 1rem;
    height: 1rem;

    list-style: none;

    border-radius: 50%;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }

    &:first-of-type {
      background: red;
    }
    &:nth-child(2) {
      background: orange;
    }
    &:last-of-type {
      background: green;
    }
  `,
};

export const StyledBase = {
  Container: styled.div<{ isOpened: boolean }>`
    position: fixed;
    top: 0;
    z-index: 9999;

    width: 100vw;
    height: ${({ theme }) => theme.layout.header.height};

    margin: 0 auto;

    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    ${({ isOpened, theme }) =>
      isOpened &&
      css`
        display: flex;
        height: 10rem;

        @media screen and (max-width: ${theme.viewPort.tabletMax}) {
          height: 15rem;
        }
        @media screen and (max-width: ${theme.viewPort.mobileMax}) {
          height: auto;
        } ;
      `}
  `,

  Title: styled.div<{ isOpened: boolean }>`
    flex-shrink: 0;

    margin-left: 4rem;

    font-size: ${({ theme }) => theme.fontSizes.s};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    ${({ isOpened }) =>
      isOpened &&
      css`
        display: none;
      `}

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.tabletMax}) {
        margin-left: 4.5rem;
      }
    `}
  `,

  Header: styled.header<{ isOpened: boolean }>`
    width: 100%;
    height: 100%;

    transition: all 0.3s;

    ${CommonStyle.Header}
  `,
  Thumbnail: styled.div<{ isOpened: boolean }>`
    position: relative;

    width: 160px;
    height: 96px;
    margin-bottom: 0.5rem;

    ${({ isOpened }) =>
      !isOpened &&
      css`
        display: none;
      `}

    ${({ theme }) =>
      theme &&
      css`
        @media screen and (max-width: ${theme.viewPort.tabletMax}) {
          width: 120px;
          height: 96px;
        }
        @media screen and (max-width: ${theme.viewPort.tabletMax}) {
          width: 100px;
          height: 60px;
        }
      `}
  `,
  LinksContainer: styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        flex-direction: column;
      }
    `}
  `,
  Links: styled.ul<{ isOpened: boolean }>`
    display: flex;

    padding: 0;

    transition: all 0.3s;

    ${({ isOpened, theme }) =>
      isOpened
        ? css`
            display: flex;
            align-items: flex-end;
            justify-content: space-evenly;
            width: 100%;
            margin: 0 auto;
            margin: 0 6rem;

            @media screen and (max-width: ${theme.viewPort.mobileMax}) {
              flex-direction: column;
              align-items: center;
              width: 100%;
            }
          `
        : css`
            @media screen and (max-width: ${theme.viewPort.mobileMax}) {
              display: none;
            }
          `}
  `,
  LinkContainer: styled.li<{ isOpened: boolean; isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0.125rem 0.5rem;
    margin-left: 1.5rem;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: white;
    text-align: center;

    cursor: pointer;
    border-radius: 5px;

    ${({ isActive, theme }) =>
      isActive &&
      css`
        color: ${theme.colors.white};
        background-color: rgba(256, 256, 256, 0.3);
      `}
    ${({ isOpened }) =>
      isOpened &&
      css`
        padding: 0.5rem;
        margin-left: 0;
        border: 2px solid transparent;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          transition: all 0.3s;
        }
      `} 
    ${({ isOpened, isActive, theme }) =>
      isActive &&
      isOpened &&
      css`
        border: 1px solid ${theme.colors.primary.light};
        border-radius: 20px;
      `}
  `,

  OutLinks: styled.ul<{ isOpened: boolean }>`
    position: absolute;
    right: 1rem;
    z-index: 99;
    display: flex;
    align-items: center;
    height: 100%;

    ${({ isOpened, theme }) =>
      isOpened
        ? css`
            @media screen and (max-width: ${theme.viewPort.mobileMax}) {
              position: relative;
              right: 0;
              justify-content: center;
              width: 100%;
              height: 3rem;
              margin: 1rem 0;
            }
          `
        : css`
            @media screen and (max-width: ${theme.viewPort.mobileMax}) {
              right: 1rem;
            }
          `}
  `,
  OutLinkContainer: styled.li`
    margin: 0 0.5rem;
  `,
};
