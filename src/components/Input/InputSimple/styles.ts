import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../other/constants';

export const getStyles = ({
  theme = defaultTheme,
  disabled = false,
  error = false,
}) =>
  StyleSheet.create({
    labelContainer: {
      marginBottom: theme.spaces.xxs,
    },
    labelText: {
      fontFamily: theme.fonts.fontFamily,
      fontSize: theme.fontSizes.body,
      color: disabled
        ? theme.colors.gray15
        : error
        ? theme.colors.accent2
        : theme.colors.gray70,
    },
  });
