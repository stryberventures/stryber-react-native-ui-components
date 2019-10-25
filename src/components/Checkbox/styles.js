import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = (theme = defaultTheme, checked) =>
  StyleSheet.create({
    container: {
      margin: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    textContainer: {marginLeft: 16},
    checkbox: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: checked ? theme.colors.primary : 'transparent',
      width: theme.sizes.checkbox,
      borderColor: theme.colors.secondary,
      borderRadius: theme.sizes.checkbox / 2,
      height: theme.sizes.checkbox,
    },
  });

export default getStyles;

export const textStyle = () => {
  return {
    fontSize: 16,
    color: '#757575',
  };
};
