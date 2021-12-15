import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {IButtonCounterProps, IButtonCounterState} from '../ButtonCounter';

const getStyles = (
  theme: any = defaultTheme,
  props: IButtonCounterProps,
  state: IButtonCounterState,
) => {
  const propsColorValue =
    theme.colors[props.color as keyof typeof defaultTheme.colors] ||
    props.color;
  const propsSecondaryColorValue =
    theme.colors[props.secondaryColor as keyof typeof defaultTheme.colors] ||
    props.secondaryColor;
  const primaryColor = propsColorValue || theme.colors.primary;
  const buttonType = 'regular';
  const fontSize =
    props.size === 'small'
      ? theme.fontSizes.subhead
      : props.size === 'mini'
      ? theme.fontSizes.captionSmall
      : theme.fontSizes.button;
  const fontWeight =
    props.size === 'small'
      ? theme.fontWeights.semibold
      : props.size === 'mini'
      ? theme.fontWeights.semibold
      : theme.fontWeights.semibold;
  const buttonHeight =
    props.size === 'small'
      ? theme.spaces.xl
      : props.size === 'mini'
      ? theme.spaces.xl
      : theme.spaces.xxl8;
  const buttonWidth =
    props.size === 'small'
      ? theme.sizes.smallButtonWidth
      : props.size === 'mini'
      ? theme.sizes.miniButtonWidth
      : 'auto';
  const borderRadius =
    props.shape === 'rounded'
      ? theme.sizes.radius
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
  const sideColWidth =
    props.size === 'small' ? 25 : props.size === 'mini' ? 25 : 50;

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
        textAlign: 'center' as const,
        color: propsSecondaryColorValue || theme.colors.onPrimary,
      },
    },
  };
  const buttonIconConfig =
    props.size === 'mini' || props.size === 'small'
      ? {
          transform: [
            {
              scale: 0.7,
            },
          ],
        }
      : {};
  const reduceButtonDisabled = state.count === props.minValue;
  const growButtonDisabled = !!props.maxValue && state.count === props.maxValue;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      height: buttonHeight,
      width: buttonWidth,
      marginVertical: theme.spaces.xs,
      borderRadius: borderRadius,
      ...buttonsConfig[buttonType].button,
      ...shadow,
      paddingHorizontal: 0,
    },
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
    buttonText: {
      fontSize: fontSize,
      fontWeight: fontWeight as any,
      ...buttonsConfig[buttonType].buttonText,
    },
    leftCol: {
      width: sideColWidth,
    },
    centerCol: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightCol: {
      width: sideColWidth,
    },
    touchOverlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderRadius: borderRadius,
      backgroundColor: theme.colors.black,
      opacity: state.isTouched ? 0.15 : 0,
    },
    reduceButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      opacity: reduceButtonDisabled ? 0.8 : 1,
    },
    growButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      opacity: growButtonDisabled ? 0.8 : 1,
    },
    buttonIcon: {
      ...buttonIconConfig,
    },
    buttonIconMinus: {
      color: reduceButtonDisabled
        ? theme.colors.gray15
        : props.iconProps.fill ||
          propsSecondaryColorValue ||
          theme.colors.white,
    },
    buttonIconPlus: {
      color: growButtonDisabled
        ? theme.colors.gray15
        : props.iconProps.fill ||
          propsSecondaryColorValue ||
          theme.colors.white,
    },
  });
};
export default getStyles;
