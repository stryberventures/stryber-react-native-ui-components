import {StyleSheet} from 'react-native';
// @ts-ignore
import {merge} from 'lodash-es';
import {defaultTheme} from '../../../constants';
import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from '../constants';

export const getStyles = ({
  theme = defaultTheme,
  multiline = false,
  secure = false,
  numberOfLines = NUMBER_OF_LINES,
  maxNumberOfLines = MAX_NUMBER_OF_LINES,
  classes = {},
  color = '',
}) => {
  const primaryColor = color || theme.colors.primary;
  const ownClasses = {
    container: {},
    inputBox: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: multiline
        ? theme.fontSizes.body * 1.8 * numberOfLines
        : theme.sizes.inputHeight,
      maxHeight: multiline
        ? theme.fontSizes.body * 1.8 * maxNumberOfLines
        : theme.sizes.inputHeight,
      alignItems: multiline ? 'flex-start' : 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray15,
      borderRadius: theme.sizes.radius,
      backgroundColor: theme.colors.white,
      overflow: 'hidden',
    },
    inputBoxDisabled: {
      backgroundColor: theme.colors.gray5,
    },
    inputBoxFocused: {
      borderColor: primaryColor,
    },
    inputBoxError: {
      borderColor: theme.colors.accent,
    },
    input: {
      flex: 1,
      paddingTop: multiline ? 10 : 0,
      paddingBottom: 0,
      margin: 0,
      paddingLeft: 0,
      borderWidth: 0,
      fontFamily: theme.fonts.fontFamily,
      fontSize: theme.fontSizes.body,
      color: theme.colors.gray70,
      textAlignVertical: multiline ? 'top' : 'center',
    },
    inputWrapper: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: secure ? 0 : 20,
    },
    errorText: {
      color: theme.colors.accent2,
      marginTop: theme.spaces.m,
      fontSize: theme.fontSizes.small,
    },
    toggleWrapper: {
      height: '100%',
      justifyContent: 'center',
      flex: 0,
    },
    toggle: {
      paddingHorizontal: theme.spaces.m,
    },
  };

  // @ts-ignore
  return StyleSheet.create(merge(ownClasses, classes));
};
