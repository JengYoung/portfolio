import React from 'react';

import Link from 'next/link';

import { Hamburger } from '@components/Hamburger';

import useHeader from '@hooks/useHeader';
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
      name: 'EXPERIENCES',
      url: '/experiences-and-projects',
    },
  ];

  const { isScrollDown } = useHeader();
  const { windowState } = useWindow(['location']);

  return (
    <StyledBase.Container hidden={hidden}>
      <StyledBase.Header isScrollDown={isScrollDown}>
        <Hamburger />
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
    </StyledBase.Container>
  );
}

Base.defaultProps = {
  hidden: false,
};

export default Base;
