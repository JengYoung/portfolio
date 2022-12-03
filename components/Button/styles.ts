import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ColorSchemeType } from '@hooks/useColorScheme';

import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '@utils/constants';

import Moon from './moon.svg';
import Sun from './sun.svg';

type SizeType = { size: string };

type SchemeType = {
  scheme: ColorSchemeType;
};

type ToggleType = {
  toggled: boolean;
};

const SchemeSvgCSS = (visible: boolean) => css`
  top: 0;
  right: 0;
  opacity: ${visible ? 1 : 0};
  transition: all 0.5s;
  transform: rotate(${visible ? 0 : '-180deg'});
`;

export const StyledScheme = {
  Container: styled.button<SizeType & SchemeType>`
    position: relative;
    box-sizing: border-box;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    padding: 0;
    margin: 0;
  `,
  Moon: styled(Moon)<SchemeType>`
    position: absolute;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    opacity: 0;
    fill: ${({ theme }) => theme.colors.scheme};

    ${({ scheme }) => SchemeSvgCSS(scheme === COLOR_SCHEME_DARK)}
  `,
  Sun: styled(Sun)<SchemeType>`
    position: absolute;
    width: 100%;
    height: 100%;

    ${({ scheme }) => SchemeSvgCSS(scheme === COLOR_SCHEME_LIGHT)}
  `,
};

export const StyledToggle = {
  Container: styled.button<SizeType>`
    box-sizing: border-box;
    width: ${({ size }) => css`calc(${size} * 2)`};
    height: ${({ size }) => css`calc(${size})`};
    padding: 0;
    margin: 0;
  `,
  Inner: styled.div<SizeType>`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary.light};
    border-radius: ${({ size }) => css`calc(${size} / 2)`};
  `,
  WheelContainer: styled.div<SizeType & ToggleType>`
    position: relative;
    box-sizing: border-box;

    width: ${({ size }) => size};
    height: ${({ size }) => size};

    background-color: ${({ theme }) => theme.colors.white};

    border-radius: 50%;

    transition: all 0.3s;
    transform: scale(0.8);

    ${({ toggled }) =>
      toggled &&
      css`
        transform: translateX(100%) scale(0.8);
      `}
  `,
};
