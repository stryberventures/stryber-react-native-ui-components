import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {SliderConfigs} from './constants';

export const getStyles = ({
  theme = defaultTheme,
  size = 'regular',
  color,
}: any) => {
  // @ts-ignore
  const config = SliderConfigs[size];
  const primaryColor = color || theme.colors.primary;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rangeBarContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftLabelContainer: {
      marginRight: theme.spaces.s,
    },
    rightLabelContainer: {
      marginLeft: theme.spaces.s,
    },
    labelsBottomContainer: {
      flexDirection: 'row',
      marginTop: config.buttonRadius - config.barHeight / 2 + theme.spaces.xxs,
    },
    leftBottomLabelContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    rightBottomLabelContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    labelText: {
      fontSize: theme.fontSizes.headline,
      fontWeight: '700',
    },
    rangeBarWrapper: {
      /* Android bug fix for button positioning */
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'transparent',

      height: config.barHeight,
      width: '100%',
      backgroundColor: theme.colors.gray15,
      borderRadius: 10,
      overflow: 'hidden',
    },
    rangeBar: {
      height: '100%',
      backgroundColor: primaryColor,
    },
    buttonWrapper: {
      position: 'absolute',
      marginLeft: config.buttonRadius - config.pulsarRadius,
      width: config.pulsarRadius * 2,
      height: config.pulsarRadius * 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topButton: {
      zIndex: 1,
    },
    buttonPulsarWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    buttonPulsar: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: config.pulsarRadius,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: primaryColor,
      opacity: 0.2,
    },
    buttonTooltip: {
      position: 'absolute',
      width: 32,
      height: 32,
      borderRadius: theme.sizes.smallRadius,
      alignItems: 'center',
      justifyContent: 'center',
      top: -39,
      backgroundColor: theme.colors.black,
    },
    tooltipArrow: {
      position: 'absolute',
      bottom: -4,
      width: 0,
      height: 0,
      borderTopWidth: 4,
      borderRightWidth: 5,
      borderBottomWidth: 0,
      borderLeftWidth: 5,
      borderTopColor: theme.colors.black,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    buttonTooltipText: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.white,
    },
    button: {
      width: config.buttonRadius * 2,
      height: config.buttonRadius * 2,
      borderRadius: config.buttonRadius,
      backgroundColor: theme.colors.white,
      //backgroundColor: 'rgba(255, 255, 255, 0.5)',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  });
};
