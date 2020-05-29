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
    iconContainer: {
      width: 65,
      height: '100%',
      marginRight: -20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIconContainer: {
      width: 65,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
