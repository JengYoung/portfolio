import React from 'react';

import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ImageSizeOption, LinksImageInterface } from './types';

/**
 * @description
 * 링크들이 있는 이미지입니다.
 */

type ContainerType = { size: ImageSizeOption<string>['size']; bg?: string };

const StyledLinks = {
  Links: styled.ul`
    position: relative;

    display: flex;
    align-items: center;

    transition: all 0.3s;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        border-radius: 10px;
      }
    `}
  `,
  LinkInner: styled.li`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;

    margin: 0rem 1rem;

    ${({ theme }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        margin: 0;
      }
    `}

    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: black;

    text-align: center;

    background-color: white;

    border-radius: 5px;
    transition: all 0.3s;
  `,
  LinkContainer: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin-bottom: 0.5rem;
    text-align: center;
  `,
  Link: styled.a`
    position: relative;
    display: flex;
    align-items: center;
  `,
  LinkIcon: styled.div`
    display: flex;
    flex-shrink: 0;
    align-self: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.25rem;
  `,
};

const Styled = {
  Container: styled.div<ContainerType>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    background-color: ${({ theme }) => theme.colors.white};

    border-radius: 10px;

    ${({ theme, size }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: ${size.width};
        min-width: 17.5vw;
        border-radius: 5px;
      }
    `}
  `,
  ImageContainer: styled.div<ContainerType>`
    position: relative;
    flex-shrink: 0;

    width: ${({ size }) => size.width};
    height: ${({ size }) => size.height};

    margin: 0.5rem;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};

    ${({ theme, size }) => css`
      @media screen and (max-width: ${theme.viewPort.mobileMax}) {
        width: ${size.width};
        min-width: 17.5vw;
        height: ${size.height};
      }
    `}
  `,
};

/**
 *
 * @param LinkButtonInterface: links를 사용함에 있어 주의합시다. name은 고유한 값을 갖고 있어야 합니다.
 */
function LinksImage({ image, links, imageOptions }: LinksImageInterface<string>) {
  return (
    <Styled.Container size={imageOptions.size}>
      <Styled.ImageContainer size={imageOptions.size}>
        <Image src={image.src} alt={image.alt} layout="fill" objectFit={imageOptions.objectFit} />
      </Styled.ImageContainer>

      <StyledLinks.Links>
        {links.map((link) => (
          <StyledLinks.LinkContainer key={link.name}>
            <StyledLinks.LinkInner>
              <StyledLinks.Link
                id={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledLinks.LinkIcon>
                  <Image src={link.iconSrc} alt={image.alt} layout="fill" objectFit="contain" />
                </StyledLinks.LinkIcon>
              </StyledLinks.Link>
            </StyledLinks.LinkInner>
          </StyledLinks.LinkContainer>
        ))}
      </StyledLinks.Links>
    </Styled.Container>
  );
}

export default LinksImage;
