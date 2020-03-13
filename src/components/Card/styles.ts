import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 13,
    },
  });
export default getStyles;
