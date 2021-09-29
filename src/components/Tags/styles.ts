import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';

const getStyles = (theme = defaultTheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    errorContainer: {
      marginTop: theme.spaces.xxs,
    },
    errorText: {
      fontSize: theme.fontSizes.caption,
      color: theme.colors.accent2,
    },
    textStyleError: {
      color: theme.colors.accent2,
    },
  });
};
export default getStyles;
