import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = ({
  theme = defaultTheme,
  focused = false,
  disabled = false,
  error = false,
  additionalPaddingLeft = 0,
  disablePaddingRight = false,
}) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: theme.sizes.radius,
    },
    input: {
      borderWidth: theme.sizes.borderWidth,
      borderColor: focused ? theme.colors.primary : theme.colors.gray,
      borderRadius: theme.sizes.radius,
      height: theme.sizes.inputHeight,
      overflow: 'hidden',
      paddingHorizontal: theme.sizes.paddingHorizontal,
      paddingLeft: theme.sizes.paddingHorizontal + additionalPaddingLeft,
      backgroundColor: disabled ? '#f0f0f0' : '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: disablePaddingRight ? 0 : theme.sizes.paddingHorizontal,
    },
    placeholder: {
      position: 'absolute',
      top: 13,
      left: additionalPaddingLeft + theme.sizes.paddingHorizontal,
    },
    toggle: {
      width: theme.sizes.base * 2,
      height: theme.sizes.base * 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 0,
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
      height: theme.sizes.inputHeight,
    },
    rightBlock: {
      height: '100%',
      justifyContent: 'center',
      flex: 0,
      marginRight: 10,
    },
  });

export default getStyles;
