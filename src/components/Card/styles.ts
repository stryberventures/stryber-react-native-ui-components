import {StyleSheet} from 'react-native';

import {defaultTheme} from '../other/constants';
import {ICardProps} from './index';

const getStyles = (theme: any = defaultTheme, props: ICardProps) => {
  const cardBackground = props.background
    ? theme.colors[props.background] || props.background
    : props.shadow || props.shadowTwo
    ? theme.colors.white
    : undefined;

  return StyleSheet.create({
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
    cardStyles: {
      ...props.style,
      borderRadius: theme.sizes.blockRadius,
      overflow: 'hidden',
      flex: 0,
      backgroundColor: cardBackground,
    },
  });
};
export default getStyles;
