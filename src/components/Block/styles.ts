import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    block: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    card: {
      borderRadius: theme.sizes.radius,
    },
    center: {
      alignItems: 'center',
    },
    middle: {
      justifyContent: 'center',
    },
    left: {
      justifyContent: 'flex-start',
    },
    right: {
      justifyContent: 'flex-end',
    },
    top: {
      justifyContent: 'flex-start',
    },
    bottom: {
      justifyContent: 'flex-end',
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 13,
      elevation: 2,
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
