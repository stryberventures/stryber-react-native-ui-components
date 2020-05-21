import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {SwitchConfigs} from './constants';

export const getStyles = ({theme = defaultTheme, size = 'regular'}) => {
  // @ts-ignore
  const config = SwitchConfigs[size] || SwitchConfigs.regular;
  const {width, height, borderRadius, circleRadius, padding} = config;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width,
      height,
      borderRadius: borderRadius,
      backgroundColor: theme.colors.gray15,
      padding,
    },
    containerError: {
      backgroundColor: theme.colors.accent2,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    circle: {
      width: circleRadius,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: theme.colors.white,
    },
    text: {
      marginLeft: theme.spaces.xs,
      fontSize:
        size === 'large' ? theme.fontSizes.body : theme.fontSizes.subhead,
    },
    errorContainer: {
      marginTop: theme.spaces.m,
    },
    errorText: {
      fontSize: theme.fontSizes.caption,
      color: theme.colors.accent2,
    },
  });
};
