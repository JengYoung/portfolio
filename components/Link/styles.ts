import Image from 'next/image';

import styled from '@emotion/styled';

import { IconLinkStyleInterface, IconTextLinkStyleInterface } from './types';

export const Styled = {
  Link: styled.a<IconLinkStyleInterface>`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: all 0.3s;

    &:hover,
    &:active {
      transform: scale(1.2);
    }
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.fontSizes.s};
  `,
};

export const StyledIconTextLink = {
  Link: styled.a<IconTextLinkStyleInterface>`
    position: relative;
    display: flex;
    align-items: center;
    min-height: ${({ iconSize }) => iconSize};
    padding: 0.125rem 0.25rem;
    overflow: hidden;
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 8px;
    transition: all 0.3s;

    &:hover,
    &:active {
      transform: scale(1.2);
    }
  `,
  LinkImage: styled(Image)`
    display: block;
    background-color: white;
    border-radius: 50%;
  `,
  Text: styled.span`
    display: block;
    width: 100%;
    height: 100%;
    margin-left: 0.25rem;
    font-size: ${({ theme }) => theme.fontSizes.s};
    color: ${({ theme }) => theme.colors.white};
  `,
};
