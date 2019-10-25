import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    badge: {
      flex: 0,
      minWidth: theme.sizes.base,
      height: theme.sizes.base,
      backgroundColor: theme.colors.accent,
      padding: 2,
    },
    accent: {backgroundColor: theme.colors.accent},
    primary: {backgroundColor: theme.colors.primary},
    secondary: {backgroundColor: theme.colors.secondary},
    tertiary: {backgroundColor: theme.colors.tertiary},
    black: {backgroundColor: theme.colors.black},
    white: {backgroundColor: theme.colors.white},
    gray: {backgroundColor: theme.colors.gray},
    gray2: {backgroundColor: theme.colors.gray2},
  });

export default getStyles;
