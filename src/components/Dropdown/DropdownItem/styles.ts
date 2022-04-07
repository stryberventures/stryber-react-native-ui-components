import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../../constants';

const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      width: '100%',
      height: theme.spaces.xxl5,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
    },
  });
export default getStyles;
