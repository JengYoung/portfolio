import { isMobileSize } from '@utils/viewports';

const getFeatureText = (width: number) => {
  const isTablet = isMobileSize(width);
  return [
    {
      x: 0,
      y: '100%',
      value: 'F',
    },
    {
      x: isTablet ? 27.5 : 40,
      y: '100%',
      value: 'E',
    },
    {
      x: isTablet ? 60 : 85,
      y: '100%',
      value: 'A',
    },
    {
      x: isTablet ? 92.5 : 130,
      y: '100%',
      value: 'T',
    },
    {
      x: isTablet ? 125 : 177.5,
      y: '100%',
      value: 'U',
    },
    {
      x: isTablet ? 160 : 230,
      y: '100%',
      value: 'R',
    },
    {
      x: isTablet ? 195 : 280,
      y: '100%',
      value: 'E',
    },
    {
      x: isTablet ? 225 : 325,
      y: '100%',
      value: 'S',
    },
  ];
};

export default getFeatureText;
