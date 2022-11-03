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
};

export default globalTheme;
