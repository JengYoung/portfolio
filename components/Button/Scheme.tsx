import React from 'react';

import { useColorScheme } from '@hooks/useColorScheme';

import { StyledScheme } from './styles';

interface SchemeButtonPropsInterface {
  size: string;
}
function Scheme({ size }: SchemeButtonPropsInterface) {
  const { colorScheme, onChangeColorScheme } = useColorScheme();

  return (
    <StyledScheme.Container size={size} scheme={colorScheme} onClick={onChangeColorScheme}>
      <StyledScheme.Moon scheme={colorScheme} />
      <StyledScheme.Sun scheme={colorScheme} />
    </StyledScheme.Container>
  );
}

export default Scheme;
