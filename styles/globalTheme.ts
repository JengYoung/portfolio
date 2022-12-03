export type CustomTheme = typeof globalTheme;

const viewPort = {
  mobileMin: '260px',
  mobileMax: '500px',
  tabletMin: '501px',
  tabletMiniMax: '768px',
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
  white: '#fdfdfd',
  danger: '#FE0101',
  warning: '#FF7B01',
  success: '#61C454',
  headerColor: '#c0edf5',
  canvasBackground: '#fff',
  border: '#ddd',
  background: {
    darkmode: '#222',
    lightmode: '#fafafa',
  },
};

const fontWeights = {
  extrabold: 900,
  bold: 700,
  default: 400,
};

const heads = {
  1: { size: '4rem', weight: fontWeights.extrabold },
  2: { size: '3rem', weight: fontWeights.bold },
  3: { size: '2.5rem', weight: fontWeights.bold },
  4: { size: '2rem', weight: fontWeights.bold },
};

const fontSizes = {
  max: '2rem',
  xxl: '1.5rem',
  xl: '1.25rem',
  l: '1.125rem',
  default: '1rem',
  s: '0.875rem',
  xs: '0.75rem',
  xxs: '0.625rem',
  min: '0.5rem',
};

const layout = {
  header: {
    height: '32px',
  },
};

const globalTheme = {
  layout,
  colors,
  fontWeights,
  heads,
  fontSizes,
  viewPort,
} as const;

export default globalTheme;
