import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Scheme from '@components/Button/Scheme';
import { Hamburger } from '@components/Hamburger';
import IconLink from '@components/Link/IconLink';

import useWindow from '@hooks/useWindow';

import { MY_GITHUB_URL, MY_TECH_BLOG_URL } from '@utils/constants';

import { StyledBase } from './styles';

interface BasePropsInterface {
  hidden?: boolean;
}
function Base({ hidden }: BasePropsInterface) {
  const router = useRouter();

  const links = [
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
  }, []);

  const { windowState } = useWindow(['location']);

  const onLinkContainerClick = (url: string) => {
    router.push(url);
  };

  const outLinks = [
    {
      href: MY_GITHUB_URL,
      iconSrc: '/github.png',
      alt: 'GitHub URL',
    },
    {
      href: MY_TECH_BLOG_URL,
      iconSrc: '/velog.png',
      alt: 'TechBlog URL',
    },
  ];

  return (
    <StyledBase.Container isOpened={isOpened} hidden={hidden}>
      <StyledBase.Header isOpened={isOpened}>
        <Hamburger onClick={() => setIsOpened((state) => !state)} margin="0 0 0 1rem" />

        <StyledBase.Title isOpened={isOpened}>Portfolio</StyledBase.Title>

        <StyledBase.LinksContainer>
          <StyledBase.Links isOpened={isOpened}>
            {links.map((link) => (
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

          <StyledBase.RightLinks isOpened={isOpened}>
            <StyledBase.ToggleContainer>
              <Scheme size="20px" />
            </StyledBase.ToggleContainer>
            {outLinks.map((link) => (
              <StyledBase.OutLinkContainer key={link.iconSrc}>
                <IconLink
                  width="20px"
                  height="20px"
                  iconSrc={link.iconSrc}
                  alt={link.alt}
                  href={link.href}
                />
              </StyledBase.OutLinkContainer>
            ))}
          </StyledBase.RightLinks>
        </StyledBase.LinksContainer>
      </StyledBase.Header>
    </StyledBase.Container>
  );
}

Base.defaultProps = {
  hidden: false,
};

export default Base;
