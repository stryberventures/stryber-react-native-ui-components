import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {IButtonProps, IButtonState} from './index';

const getStyles = (
  theme = defaultTheme,
  props: IButtonProps,
  state: IButtonState,
) => {
  const primaryColor = props.color || theme.colors.primary;
  const buttonType = props.type || 'regular';
  const fontSize =
    props.size === 'small'
      ? theme.fontSizes.subhead
      : props.size === 'mini'
      ? theme.fontSizes.caption
      : theme.fontSizes.button;
  const fontWeight =
    props.size === 'small'
      ? theme.fontWeights.regular
      : props.size === 'mini'
      ? theme.fontWeights.regular
      : theme.fontWeights.semibold;
  const buttonHeight =
    props.size === 'small'
      ? theme.spaces.xxl5
      : props.size === 'mini'
      ? theme.spaces.xxl2
      : theme.spaces.xxl8;
  const buttonWidth =
    props.size === 'small'
      ? theme.sizes.smallButtonWidth
      : props.size === 'mini'
      ? theme.sizes.miniButtonWidth
      : undefined;
  const borderRadius =
    props.shape === 'rounded'
      ? theme.sizes.smallRadius
      : props.shape === 'round'
      ? theme.sizes.largeRadius
      : 0;
  const shadow = props.shadow
    ? {
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }
    : {};

  const buttonsConfig = {
    regular: {
      button: {
        backgroundColor: primaryColor,
        ...(props.disabled
          ? {
              backgroundColor: theme.colors.gray15,
              opacity: 0.7,
            }
          : {}),
      },
      buttonText: {
        color: '#fff',
      },
    },
    outlined: {
      button: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: primaryColor,
        ...(state.isTouched
          ? {
              backgroundColor: primaryColor,
            }
          : {}),
        ...(props.disabled
          ? {
              backgroundColor: theme.colors.gray5,
              borderColor: theme.colors.gray15,
            }
          : {}),
      },
      buttonText: {
        color: primaryColor,
        ...(state.isTouched
          ? {
              color: theme.colors.white,
            }
          : {}),
        ...(props.disabled
          ? {
              color: theme.colors.gray15,
            }
          : {}),
      },
    },
  };

  return StyleSheet.create({
    button: {
      height: buttonHeight,
      width: buttonWidth,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spaces.m,
      marginVertical: theme.spaces.xs,
      borderRadius: borderRadius,
      ...buttonsConfig[buttonType].button,
      ...shadow,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: fontSize,
      fontWeight: fontWeight as any,
      ...buttonsConfig[buttonType].buttonText,
    },
    touchOverlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderRadius: borderRadius,
      backgroundColor: theme.colors.black,
      opacity: props.type === 'regular' && state.isTouched ? 0.15 : 0,
    },
    leftIconContainer: {
      marginRight: theme.spaces.xxs,
    },
    icon: {
      color: buttonsConfig[buttonType].buttonText.color,
    },
  });
};
export default getStyles;
