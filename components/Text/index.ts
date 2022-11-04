import { css } from '@emotion/react';

import styled from '@emotion/styled';

const commonStyle = css`
  padding: 0;
  margin: 0;
  color: #fff;
`;

const XSmall = styled.h5`
  font-size: 1rem;
  font-weight: 400;

  ${commonStyle}
`;

const Small = styled.h4`
  font-size: 1.25rem;
  font-weight: 400;

  ${commonStyle}
`;

const Default = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.75;

  ${commonStyle}
`;

const Large = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.75;

  ${commonStyle}
`;

const XLarge = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2;

  ${commonStyle}
`;

const XXLarge = styled.h1`
  font-size: 3rem;
  font-weight: 900;

  ${commonStyle}
`;

const MainCopy = styled(XXLarge)`
  margin-bottom: 1rem;
`;

/**
 * @description
 * 아직은 구체적인 사양을 정하지 않았으나 추후 확장하기 용이하도록 변수로 할당하였다.
 *
 * @todo
 * 확장 가능성 생각하고 이를 처리하기.
 */
const SubCopy = styled(Default)`
  margin-bottom: 1rem;
`;

const CopyStyle = {
  XSmall,
  Small,
  Default,
  Large,
  XLarge,
  XXLarge,
  MainCopy,
  SubCopy,
};

export default CopyStyle;
