import {StyleSheet } from 'react-native';
import {defaultTheme} from '../../other/constants';
import {IProgressDotsProps} from './index';

const getStyles = (theme = defaultTheme, props: IProgressDotsProps) => {
  const dotSize = props.size == "small" ? theme.spaces.xs : theme.spaces.s;
  return StyleSheet.create({
    wraper: {
      width: dotSize * props.totalValue + 8 * (props.totalValue - 1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center'
    },
    dot: {
      width: dotSize,
      height: dotSize,
      backgroundColor: theme.colors.gray,
      borderRadius: dotSize
    },
    current: {
      backgroundColor: theme.colors.primary
    }
  });
}
export default getStyles;
