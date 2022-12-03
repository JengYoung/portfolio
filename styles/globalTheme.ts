export type CustomTheme = typeof globalLightTheme & typeof globalDarkTheme;

export const globalViewPort = {
  mobileMin: '260px',
  mobileMax: '500px',
  tabletMin: '501px',
  tabletMiniMax: '768px',
  tabletMax: '1023px',
  desktopMin: '1024px',
  desktopMax: '3000px', // NOTE: Canvas의 최적화를 위해 적용한다.
};

export const lightModeColors = {
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
  toggle: '#aaa',
  scheme: '#eee',
};

export const darkModeColors = {
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
  toggle: '#aaa',
  scheme: '#eee',
};

export const globalPagesStyle = {
  intro: {
    subBgColor: {
      light: '#61C454',
      dark: '##17007A',
    },
  },
};

export const globalFontWeights = {
  extrabold: 900,
  bold: 700,
  default: 400,
};

export const globalHeadsStyle = {
  1: { size: '4rem', weight: globalFontWeights.extrabold },
  2: { size: '3rem', weight: globalFontWeights.bold },
  3: { size: '2.5rem', weight: globalFontWeights.bold },
  4: { size: '2rem', weight: globalFontWeights.bold },
};

export const globalFontSizesStyle = {
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

const globalLayoutStyle = {
  header: {
    height: '32px',
  },
};

export const globalLightTheme = {
  layout: globalLayoutStyle,
  pages: globalPagesStyle,
  colors: lightModeColors,
  fontWeights: globalFontWeights,
  heads: globalHeadsStyle,
  fontSizes: globalFontSizesStyle,
  viewPort: globalViewPort,
} as const;

export const globalDarkTheme = {
  layout: globalLayoutStyle,
  pages: globalPagesStyle,
  colors: darkModeColors,
  fontWeights: globalFontWeights,
  heads: globalHeadsStyle,
  fontSizes: globalFontSizesStyle,
  viewPort: globalViewPort,
};
