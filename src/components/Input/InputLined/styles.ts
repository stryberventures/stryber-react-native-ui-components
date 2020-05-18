import {StyleSheet, Platform} from 'react-native';
import {defaultTheme} from '../../other/constants';

export const getStyles = ({
  theme = defaultTheme,
  disabled = false,
  error = false,
  moveLabel = false,
  multiline = false,
}) => {
  const leftBlockColor = disabled
    ? theme.colors.gray15
    : error
    ? theme.colors.accent
    : theme.colors.primary;
  return StyleSheet.create({
    leftBorder: {
      width: 11,
      marginLeft: Platform.OS === 'android' ? -1 : 0,
      height: '100%',
      borderTopLeftRadius: theme.sizes.radius,
      borderBottomLeftRadius: theme.sizes.radius,
      backgroundColor: leftBlockColor,
    },
    leftBlock: {
      overflow: 'hidden',
      marginLeft: Platform.OS === 'android' ? -1 : 0,
      width: 65,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: theme.sizes.radius,
      borderBottomLeftRadius: theme.sizes.radius,
    },
    leftBlockWithRotated: {
      paddingRight: 10,
    },
    leftBlockWithNoIconBackground: {
      marginRight: -20,
    },
    additionalLeftBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight / 1.3,
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: leftBlockColor,
    },
    rotatedBlock: {
      position: 'absolute',
      width: theme.sizes.inputHeight - 14,
      right: 0,
      top: 6,
      height: theme.sizes.inputHeight - 14,
      transform: [
        {rotateZ: '146deg'},
        {rotateX: '-10rad'},
        {rotateY: '-10rad'},
      ],
      borderRadius: theme.sizes.radius,
      backgroundColor: leftBlockColor,
    },
    iconContainer: {
      position: 'relative',
      zIndex: 2,
    },
    label: {
      position: 'absolute',
      top: 13,
      left: 20,
      zIndex: 100,
    },
    labelText: {
      fontSize: 12,
      color: theme.colors.blue,
    },
    labelAnimatedText: {
      color: theme.colors.blue,
      fontSize: 12,
    },
    labelAnimatedTextError: {
      color: theme.colors.accent,
    },
    textInput: {
      marginTop: moveLabel ? 15 : multiline ? 12 : 0,
    },
  });
};
