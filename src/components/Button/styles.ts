import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    button: {
      borderRadius: theme.sizes.radius,
      height: theme.sizes.buttonHeight,
      justifyContent: 'center',
      marginVertical: theme.sizes.padding / 3,
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    accent: {backgroundColor: theme.colors.accent},
    primary: {backgroundColor: theme.colors.primary},
    secondary: {backgroundColor: theme.colors.secondary},
    tertiary: {backgroundColor: theme.colors.tertiary},
    black: {backgroundColor: theme.colors.black},
    white: {backgroundColor: theme.colors.white},
    gray: {backgroundColor: theme.colors.gray},
    gray2: {backgroundColor: theme.colors.gray2},
    darkGray: {backgroundColor: theme.colors.darkGrey},
  });
export default getStyles;
