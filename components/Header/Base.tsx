import React from 'react';

import Link from 'next/link';

import useHeader from '@hooks/useHeader';
import useWindow from '@hooks/useWindow';

import { StyledBase } from './styles';

function Base() {
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
      name: 'SKILLS',
      url: '/skills',
    },
    {
      name: 'EXPERIENCES',
      url: '/experiences',
    },
  ];

  const { isScrollDown } = useHeader();
  const { windowState } = useWindow(['location']);

  return (
    <StyledBase.Header isScrollDown={isScrollDown}>
      <StyledBase.Links>
        {Links.map((link) => (
          <StyledBase.LinkContainer
            isActive={new RegExp(windowState.location?.pathname).test(link.url)}
            key={link.name}
          >
            <Link href={link.url}>{link.name}</Link>
          </StyledBase.LinkContainer>
        ))}
      </StyledBase.Links>
    </StyledBase.Header>
  );
}

export default Base;
