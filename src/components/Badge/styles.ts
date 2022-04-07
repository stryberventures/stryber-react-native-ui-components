import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';
const getStyles = (theme = defaultTheme, color?: string) =>
  StyleSheet.create({
    badge: {
      flex: 0,
      width: theme.sizes.base,
      height: theme.sizes.base,
      backgroundColor: color || theme.colors.accent,
      padding: 2,
    },
  });
export default getStyles;
