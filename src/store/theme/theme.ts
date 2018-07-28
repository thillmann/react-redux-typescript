// @ts-ignore
import themes from '!!sass-extract-loader?{"plugins":["sass-extract-js"]}!../../theme.scss';

interface ISizes {
  s: string;
  m: string;
  l: string;
}

interface IXSSize {
  xs: string;
}

interface IXLSize {
  xl: string;
}

export interface ITheme {
  spacing: ISizes & IXSSize & IXLSize;
  inset: ISizes & IXSSize & IXLSize;
  text: ISizes & IXSSize & IXLSize;
  borderRadius: ISizes;
  boxShadow: {
    z0: string;
    z10: string;
    z20: string;
    z30: string;
    z40: string;
  };
  colors: {
    primary: string;
    primaryDark: string;
    primaryGradient: string;
    text: string;
    backgroundLight: string;
    background: string;
    greyLight: string;
    grey: string;
    greyDark: string;
  };
}

const LightTheme: ITheme = { ...themes.default, ...themes.light };
const DarkTheme: ITheme = { ...themes.default, ...themes.dark };

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

const ThemeMap = {
  [Theme.LIGHT]: LightTheme,
  [Theme.DARK]: DarkTheme
};

export default ThemeMap;
