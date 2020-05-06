import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {MIN_NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from './constants';

const getStyles = ({
  theme = defaultTheme,
  disabled = false,
  movePlaceholder = false,
  additionalPaddingLeft = 0,
  disablePaddingRight = false,
  multiline = false,
  minNumberOfLines = MIN_NUMBER_OF_LINES,
  maxNumberOfLines = MAX_NUMBER_OF_LINES,
  labelOnTop = false,
}) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: theme.sizes.radius,
    },
    input: {
      borderWidth: theme.sizes.borderWidth,
      borderColor: theme.colors.gray15,
      borderRadius: theme.sizes.radius,
      overflow: 'hidden',
      // paddingHorizontal: theme.sizes.paddingHorizontal,
      paddingLeft: theme.sizes.paddingHorizontal + additionalPaddingLeft,
      backgroundColor: disabled ? theme.colors.gray5 : '#fff',
      alignItems: multiline ? 'flex-start' : 'center',
      flexDirection: 'row',
      paddingRight:
        disablePaddingRight || multiline ? 0 : theme.sizes.paddingHorizontal,
      minHeight: multiline
        ? theme.fontSizes.body * 1.5 * minNumberOfLines
        : theme.sizes.inputHeight,
      maxHeight: multiline
        ? theme.fontSizes.body * 1.5 * maxNumberOfLines
        : theme.sizes.inputHeight,
    },
    inputFocused: {
      borderColor: theme.colors.blue,
    },
    placeholder: {
      position: 'absolute',
      top: 13,
      left: additionalPaddingLeft + theme.sizes.paddingHorizontal,
    },
    placeholderOnTop: {
      position: 'absolute',
      top: -10,
    },
    placeholderTextError: {
      color: theme.colors.accent,
    },
    toggle: {
      width: theme.sizes.base * 2,
      height: theme.sizes.base * 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 0,
    },
    leftBorder: {
      width: 11,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
    },
    error: {
      color: theme.colors.accent2,
      fontSize: theme.fontSizes.caption,
      position: 'absolute',
      bottom: -theme.spaces.m,
      letterSpacing: 0.25,
    },
    placeholderText: {
      fontSize: 12,
      color: theme.colors.blue,
    },
    placeholderTextOnTop: {
      fontSize: 16,
      fontFamily: theme.fonts.fontFamily,
      color: theme.colors.gray70,
    },
    placeholderTextOnTopError: {
      color: theme.colors.red,
    },
    placeholderTextOnTopDisabled: {
      color: theme.colors.gray15,
    },
    placeholderAnimatedText: {
      color: theme.colors.blue,
      fontSize: 12,
    },
    placeholderAnimatedTextError: {
      color: theme.colors.red,
    },
    textInput: {
      marginTop: movePlaceholder && !labelOnTop ? (multiline ? 20 : 5) : 0,
      fontSize: theme.fontSizes.body,
      color: theme.colors.gray70,
      fontFamily: theme.fonts.fontFamily,
      textAlignVertical: multiline ? 'top' : 'center',
      paddingHorizontal: 0,
      paddingVertical: 5,
    },
    leftBlock: {
      width: 50,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 11.5,
    },
    rotatedBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight - 8,
      right: 0,
      top: 4,
      height: theme.sizes.inputHeight - 8,
      transform: [
        {rotateZ: '146deg'},
        {rotateX: '-10rad'},
        {rotateY: '-10rad'},
      ],
      borderRadius: theme.sizes.radius,
      zIndex: -3,
    },
    additionalLeftBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight / 1.3,
      left: 0,
      top: 0,
      bottom: 0,
    },
    rightBlock: {
      height: '100%',
      justifyContent: 'center',
      flex: 0,
      marginRight: 10,
    },
  });
export default getStyles;
