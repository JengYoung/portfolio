import React from 'react';

import { StyledIconTextLink } from './styles';
import { IconTextPropsInterface } from './types';

function IconTextLink({ href, iconSrc, iconSize, bgColor, alt, text }: IconTextPropsInterface) {
  return (
    <StyledIconTextLink.Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      bgColor={bgColor}
      iconSize={iconSize}
      css={{ marginRight: '1rem' }}
    >
      <StyledIconTextLink.LinkImage src={iconSrc} alt={alt} width={iconSize} height={iconSize} />
      <StyledIconTextLink.Text>{text}</StyledIconTextLink.Text>
    </StyledIconTextLink.Link>
  );
}

export default IconTextLink;
