import { css } from '@emotion/react';
import React from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

/**
 * @description
 * hover하면 링크들이 보이는 이미지입니다.
 */

interface ImagePropsInterface<T> {
  src: T;
  alt: T;
}

interface LinkPropsInterface<T> {
  iconSrc: T;
  href: T;
  name: T;
}

export interface ImageSizeOption<T> {
  size: {
    width: T;
    height: T;
  };
  objectFit?: 'cover' | 'contain';
  bg?: T;
}

interface LinksImageInterface<T> {
  image: ImagePropsInterface<T>;
  links: LinkPropsInterface<T>[];
  imageOptions: ImageSizeOption<T>;
}

const StyledLinks = {
  Links: styled.ul`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50px;
    opacity: 0;
    transition: all 0.3s;

    &:hover {
      display: flex;
      cursor: pointer;
    }
  `,
  Link: styled.li`
    width: 6rem;
    padding: 1rem;
    margin: 0rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: black;
    text-align: center;
    background-color: white;
    border-radius: 20px;
    transition: all 0.3s;

    &:hover {
      background-color: #ccc;
    }
  `,
  LinkIcon: styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    margin-bottom: 0.25rem;
  `,
};

const Styled = {
  Container: styled.div<{ size: ImageSizeOption<string>['size']; bg?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => size.width};
    height: ${({ size }) => size.height};
    overflow: hidden;
    border-radius: 50px;

    ${({ bg }) =>
      bg &&
      css`
        background-color: ${bg};
      `}

    &:hover {
      ${StyledLinks.Links} {
        cursor: pointer;
        opacity: 1;
        transform: translateX(1rem) translateY(-1rem);
      }
    }
  `,
  ImageContainer: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    border-radius: 50px;
    box-shadow: -1rem 1rem 1rem rgba(0, 0, 0, 0.5);
  `,
};

/**
 *
 * @param LinkButtonInterface: links를 사용함에 있어 주의합시다. name은 고유한 값을 갖고 있어야 합니다.
 */
function LinksImage({ image, links, imageOptions }: LinksImageInterface<string>) {
  return (
    <Styled.Container size={imageOptions.size} bg={imageOptions.bg}>
      <Styled.ImageContainer>
        <Image src={image.src} alt={image.alt} layout="fill" objectFit={imageOptions.objectFit} />
      </Styled.ImageContainer>
      <StyledLinks.Links>
        {links.map((link) => (
          <StyledLinks.Link key={link.name}>
            <a id={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <StyledLinks.LinkIcon>
                <Image src={link.iconSrc} alt={image.alt} layout="fill" objectFit="cover" />
              </StyledLinks.LinkIcon>
              {link.name}
            </a>
          </StyledLinks.Link>
        ))}
      </StyledLinks.Links>
    </Styled.Container>
  );
}

export default LinksImage;
