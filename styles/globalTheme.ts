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
  type: 'light',
  primary: {
    light: '#FFD600',
    dark: '#9c36db',
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
  background: '#eee',
  toggle: '#aaa',
  scheme: '#eee',
  font: '#333',
};

export const darkModeColors = {
  type: 'dark',
  primary: {
    light: '#6c00ff',
    dark: '#250864',
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
  background: '#000',
  toggle: '#aaa',
  scheme: '#eee',
  font: '#ddd',
};

export const globalLightPagesStyle = {
  intro: {
    subBgColor: {
      light: '#FFD600',
      dark: '#9c36db',
    },
  },
  about: {
    bg: '#fff',
    featureLine: '#fff',
    name: lightModeColors.primary.dark,
  },
};

export const globalDarkPagesStyle = {
  intro: {
    subBgColor: {
      light: '#6c00ff',
      dark: '#2a0845',
    },
  },
  about: {
    bg: '#111',
    featureLine: '#111',
    name: darkModeColors.primary.light,
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
  pages: globalLightPagesStyle,
  colors: lightModeColors,
  fontWeights: globalFontWeights,
  heads: globalHeadsStyle,
  fontSizes: globalFontSizesStyle,
  viewPort: globalViewPort,
} as const;

export const globalDarkTheme = {
  layout: globalLayoutStyle,
  pages: globalDarkPagesStyle,
  colors: darkModeColors,
  fontWeights: globalFontWeights,
  heads: globalHeadsStyle,
  fontSizes: globalFontSizesStyle,
  viewPort: globalViewPort,
} as const;
