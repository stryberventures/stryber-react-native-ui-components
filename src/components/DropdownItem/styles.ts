import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 0,
      borderRadius: 0,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginVertical: 0,
      borderBottomColor: theme.colors.gray,
      borderBottomWidth: 1,
    },
  });
export default getStyles;
