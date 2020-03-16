import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
export default getStyles;
