import {StyleSheet} from 'react-native';

import {defaultTheme} from '../other/constants';
import {IButtonProps} from './index';

const getStyles = (theme = defaultTheme, props: IButtonProps) => {
  const buttonBackgroundColor =
    props.link || !props.color
      ? 'transparent'
      : theme.colors.hasOwnProperty(props.color)
      ? theme.colors[props.color as keyof typeof defaultTheme.colors]
      : props.color;
  const buttonHeight = props.link
    ? undefined
    : props.small
    ? theme.spaces.xxl5
    : props.mini
    ? theme.spaces.xxl2
    : theme.spaces.xxl8;
  const buttonWidth = props.link
    ? undefined
    : props.small
    ? theme.sizes.smallButtonWidth
    : props.mini
    ? theme.sizes.miniButtonWidth
    : undefined;

  return StyleSheet.create({
    button: {
      borderRadius: theme.sizes.radius,
      justifyContent: 'center',
      marginVertical: theme.sizes.padding / 3,
      backgroundColor: buttonBackgroundColor,
      height: buttonHeight,
      paddingHorizontal: props.link ? theme.spaces.xs : theme.spaces.m,
      paddingVertical: props.link ? theme.spaces.xxs : undefined,
      width: buttonWidth,
      alignSelf: props.link ? 'flex-start' : undefined,
    },
    childrenWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rectangle: {
      borderRadius: 0,
    },
    rounded: {
      borderRadius: theme.sizes.smallRadius,
    },
    round: {
      borderRadius: theme.sizes.largeRadius,
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
};
export default getStyles;
