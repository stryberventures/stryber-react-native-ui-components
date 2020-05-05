import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';

interface IProps {
  color?: string;
}

const getStyles = (theme = defaultTheme, {color}: IProps) => {
  const buttonBackgroundColor = !color
    ? undefined
    : theme.colors.hasOwnProperty(color)
    ? theme.colors[color as keyof typeof defaultTheme.colors]
    : color;

  return StyleSheet.create({
    button: {
      borderRadius: theme.sizes.radius,
      height: theme.sizes.buttonHeight,
      justifyContent: 'center',
      marginVertical: theme.sizes.padding / 3,
      backgroundColor: buttonBackgroundColor,
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
