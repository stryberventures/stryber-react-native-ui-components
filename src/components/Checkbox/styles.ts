import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
const getStyles = (theme = defaultTheme, checked = false, radio = false) =>
  StyleSheet.create({
    container: {
      margin: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    textContainer: {
      marginLeft: 10,
    },
    checkbox: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: checked ? theme.colors.primary : 'transparent',
      width: theme.sizes.checkbox,
      borderColor: checked ? theme.colors.primary : theme.colors.gray,
      height: theme.sizes.checkbox,
      borderRadius: radio ? theme.sizes.checkbox / 2 : 3,
    },
    radioIcon: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
    },
    textStyle: {
      fontSize: theme.sizes.base,
      color: checked ? theme.colors.primary : theme.colors.darkGrey,
    },
  });
export default getStyles;
