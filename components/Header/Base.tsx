import React, { useState } from 'react';

import Link from 'next/link';

import { Hamburger } from '@components/Hamburger';

import useWindow from '@hooks/useWindow';

import { StyledBase } from './styles';

interface BasePropsInterface {
  hidden?: boolean;
}
function Base({ hidden }: BasePropsInterface) {
  const Links = [
    {
      name: 'HOME',
      url: '/',
    },
    {
      name: 'ABOUT',
      url: '/about',
    },
    {
      name: 'EXPERIENCES & PROJECTS',
      url: '/experiences-and-projects',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const { windowState } = useWindow(['location']);

  return (
    <StyledBase.Container hidden={hidden}>
      <StyledBase.Header isOpen={isOpen}>
        <Hamburger onClick={() => setIsOpen((state) => !state)} />

        <StyledBase.Title>{`${isOpen}`}</StyledBase.Title>

        <StyledBase.Links>
          {Links.map((link) => (
            <StyledBase.LinkContainer
              isActive={new RegExp(`^${windowState.location?.pathname}$`).test(link.url)}
              key={link.name}
            >
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
