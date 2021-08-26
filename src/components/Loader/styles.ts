import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {ILoaderProps} from './index';

const getStyles = (theme = defaultTheme, props: ILoaderProps) => {
  const dotSize = props.size === 'small' ? theme.spaces.xs : theme.spaces.s;
  return StyleSheet.create({
    container: {
      width: dotSize * props.dotsAmount + 8 * (props.dotsAmount - 1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dot: {
      width: dotSize,
      height: dotSize,
      backgroundColor: theme.colors.gray,
      borderRadius: dotSize,
    },
  });
};
export default getStyles;
