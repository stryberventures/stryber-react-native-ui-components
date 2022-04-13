import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../../constants';
import {IProgressDotsProps} from './index';

const getStyles = (
  theme = defaultTheme,
  size: IProgressDotsProps['size'],
  totalValue: IProgressDotsProps['totalValue'],
) => {
  const dotSize = size === 'small' ? theme.spaces.xs : theme.spaces.s;
  return StyleSheet.create({
    wrapper: {
      width: dotSize * totalValue + 8 * (totalValue - 1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
    },
    dot: {
      width: dotSize,
      height: dotSize,
      backgroundColor: theme.colors.gray,
      borderRadius: dotSize,
    },
    current: {
      backgroundColor: theme.colors.primary,
    },
  });
};
export default getStyles;
