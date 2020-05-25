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
      height: config.barHeight,
      width: '100%',
      backgroundColor: theme.colors.gray15,
      borderRadius: 10,
      overflow: 'hidden',
    },
    rangeBar: {
      height: '100%',
      backgroundColor: primaryColor,
      marginRight: 50,
    },
    buttonWrapper: {
      position: 'absolute',
      marginLeft: config.buttonRadius - config.pulsarRadius,
      width: config.pulsarRadius * 2,
      height: config.pulsarRadius * 2,
      justifyContent: 'center',
      alignItems: 'center',
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
      alignItems: 'center',
      justifyContent: 'center',
      top: -35,
      backgroundColor: theme.colors.black,
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
      borderWidth: 1,
      borderColor: theme.colors.gray15,
    },
  });
};
