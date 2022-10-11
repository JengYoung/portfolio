import styled from '@emotion/styled';
import React from 'react';
import TransitionText from '../../components/Text/TransitionText';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const AboutPage = () => {
  return (
    <div>
      <TransitionText>안녕하세요!</TransitionText>
    </div>
  );
};

export default AboutPage;
