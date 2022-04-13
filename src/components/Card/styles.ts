import {StyleSheet} from 'react-native';

import {defaultTheme} from '../../constants';
import {ICardProps} from './index';
import {ThemeType} from '../Theme';

const getStyles = (
  theme: ThemeType = defaultTheme,
  background: ICardProps['background'],
  shadow: ICardProps['shadow'],
) => {
  const cardBackground = background
    ? theme.colors[background as keyof ThemeType['colors']] || background
    : shadow
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
      borderRadius: theme.sizes.blockRadius,
      flex: 0,
      backgroundColor: cardBackground,
    },
    imageBgStyles: {
      borderRadius: theme.sizes.blockRadius,
    },
  });
};
export default getStyles;
