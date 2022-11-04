export type CustomTheme = typeof globalTheme;

const viewPort = {
  mobileMin: '260px',
  mobileMax: '500px',
  tabletMin: '501px',
  tabletMax: '1023px',
  desktopMin: '1024px',
  desktopMax: '3000px', // NOTE: Canvas의 최적화를 위해 적용한다.
};

const colors = {
  primary: {
    dark: '#5200FF',
    light: '#FFD600',
  },
  subPrimary: '#333',
  dark: '#000',
  white: '#eee',
  danger: '#FE0101',
  warning: '#FF7B01',
  success: '#61C454',
};

const fontWeights = {
  extrabold: 900,
  bold: 700,
  default: 400,
};

const heads = {
  1: ['64px', fontWeights.extrabold],
  2: ['48px', fontWeights.bold],
  3: ['40px', fontWeights.bold],
  4: ['32px', fontWeights.bold],
};

const fontSizes = {
  max: '32px',
  xxl: '24px',
  xl: '20px',
  l: '18px',
  default: '16px',
  s: '14px',
  xs: '12px',
  xxs: '10px',
  min: '8px',
};

const globalTheme = {
  colors,
  fontWeights,
  heads,
  fontSizes,
  viewPort,
} as const;

export default globalTheme;
