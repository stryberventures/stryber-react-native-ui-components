import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = (
  theme = defaultTheme,
  focused = false,
  disabled = false,
  error = false,
  additionalPaddingLeft = 0,
) =>
  StyleSheet.create({
    input: {
      borderWidth: theme.sizes.borderWidth,
      borderColor: focused ? theme.colors.primary : theme.colors.gray,
      borderRadius: theme.sizes.radius,
      height: theme.sizes.inputHeight,
      overflow: 'hidden',
      paddingHorizontal: theme.sizes.paddingHorizontal,
      paddingLeft: theme.sizes.paddingHorizontal + additionalPaddingLeft,
      backgroundColor: disabled ? '#f0f0f0' : 'transparent',
      justifyContent: 'center',
    },
    toggle: {
      position: 'absolute',
      width: theme.sizes.base * 2,
      height: theme.sizes.base * 2,
      flex: 1,
      right: 0,
      bottom: 0,
    },
    leftBorder: {
      width: 7,
      height: theme.sizes.inputHeight,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
    },
    error: {
      color: theme.colors.accent2,
      fontSize: theme.sizes.caption,
      position: 'absolute',
      bottom: -6,
      letterSpacing: 0.25,
    },
    placeholderText: {
      fontSize: 15,
      color: theme.colors.gray2,
    },
    placeholderAnimatedText: {
      color: theme.colors.gray2,
      fontSize: 12,
    },
    placeholder: {
      position: 'absolute',
      top: 13,
      left: theme.sizes.paddingHorizontal + additionalPaddingLeft,
    },
    textInput: {
      fontSize: theme.sizes.font,
      fontWeight: '500',
      color: focused
        ? theme.colors.primary
        : error
        ? theme.colors.accent
        : theme.colors.darkGrey,
    },
    leftBlock: {
      width: 50,
      position: 'absolute',
      height: theme.sizes.inputHeight,
      zIndex: 1,
    },
    rotatedBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight - 8,
      right: 0,
      top: 4,
      height: theme.sizes.inputHeight - 8,
      backgroundColor: theme.colors.primary,
      transform: [{rotate: '45deg'}],
      borderRadius: theme.sizes.radius,
    },
    additionalLeftBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight / 1.3,
      left: 0,
      top: 0,
      height: theme.sizes.inputHeight,
      backgroundColor: theme.colors.primary,
    },
  });

export default getStyles;
