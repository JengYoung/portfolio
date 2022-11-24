import React from 'react';

import Image from 'next/image';

import { Styled } from './styles';

interface IconLinkStyleInterface {
  width: string;
  height: string;
}
interface IconLinkPropsInterface extends IconLinkStyleInterface {
  href: string;
  iconSrc: string;
  alt: string;
}
function IconLink({ href, iconSrc, width, height, alt }: IconLinkPropsInterface) {
  return (
    <Styled.Link
      href={href}
      width={width}
      height={height}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={iconSrc} alt={alt} layout="fill" objectFit="contain" />
    </Styled.Link>
  );
}

export default IconLink;
