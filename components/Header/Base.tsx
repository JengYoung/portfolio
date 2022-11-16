import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Hamburger } from '@components/Hamburger';

import useWindow from '@hooks/useWindow';

import { StyledBase } from './styles';

interface BasePropsInterface {
  hidden?: boolean;
}
function Base({ hidden }: BasePropsInterface) {
  const router = useRouter();

  const Links = [
    {
      name: 'HOME',
      url: '/',
      thumbnail: '/pages/index.png',
    },
    {
      name: 'ABOUT',
      url: '/about',
      thumbnail: '/pages/about.png',
    },
    {
      name: 'EXPERIENCES & PROJECTS',
      url: '/experiences-and-projects',
      thumbnail: '/pages/experiences-and-skills.png',
    },
  ];

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const onBack = (e: KeyboardEventInit) => {
      if (e.key === 'Escape') {
        setIsOpened(() => false);
      }
    };

    window.addEventListener('keydown', onBack);
    return () => {
      window.removeEventListener('keydown', onBack);
    };
  });

  const { windowState } = useWindow(['location']);

  const onLinkContainerClick = (url: string) => {
    router.push(url);
  };

  return (
    <StyledBase.Container isOpened={isOpened} hidden={hidden}>
      <StyledBase.Header isOpened={isOpened}>
        <Hamburger onClick={() => setIsOpened((state) => !state)} />

        <StyledBase.Title isOpened={isOpened}>Portfolio</StyledBase.Title>

        <StyledBase.Links isOpened={isOpened}>
          {Links.map((link) => (
            <StyledBase.LinkContainer
              isOpened={isOpened}
              isActive={new RegExp(`^${windowState.location?.pathname}$`).test(link.url)}
              key={link.name}
              onClick={() => onLinkContainerClick(link.url)}
            >
              <StyledBase.Thumbnail isOpened={isOpened}>
                <Image src={link.thumbnail} layout="fill" objectFit="contain" />
              </StyledBase.Thumbnail>
              <Link href={link.url}>{link.name}</Link>
            </StyledBase.LinkContainer>
          ))}
        </StyledBase.Links>
      </StyledBase.Header>
    </StyledBase.Container>
  );
}

Base.defaultProps = {
  hidden: false,
};

export default Base;
