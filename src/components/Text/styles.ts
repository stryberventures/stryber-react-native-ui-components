import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    // default style
    text: {
      fontSize: theme.sizes.font,
      color: theme.colors.black,
      fontFamily: theme.fonts.fontFamily,
    },
    // variations
    regular: {
      fontWeight: 'normal',
    },
    bold: {
      fontWeight: 'bold',
    },
    semibold: {
      fontWeight: '600',
    },
    medium: {
      fontWeight: '500',
    },
    light: {
      fontWeight: '200',
    },
    // position
    center: {textAlign: 'center'},
    right: {textAlign: 'right'},
    left: {textAlign: 'left'},
    // colors
    accent: {color: theme.colors.accent},
    primary: {color: theme.colors.primary},
    secondary: {color: theme.colors.secondary},
    tertiary: {color: theme.colors.tertiary},
    black: {color: theme.colors.black},
    white: {color: theme.colors.white},
    gray: {color: theme.colors.gray},
    gray2: {color: theme.colors.gray2},
    // fonts
    title: theme.fonts.title,
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    headline: theme.fonts.headline,
    body: theme.fonts.body,
    button: theme.fonts.button,
    subhead: theme.fonts.subhead,
    footnote: theme.fonts.footnote,
    caption: theme.fonts.caption,
    small: theme.fonts.small,
  });
export default getStyles;