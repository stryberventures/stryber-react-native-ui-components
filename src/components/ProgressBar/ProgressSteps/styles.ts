import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../../constants';
import {IProgressStepsProps} from './index';
import {ThemeType} from '../../Theme';

const getStyles = (
  theme: ThemeType = defaultTheme,
  size: IProgressStepsProps['size'],
  value: IProgressStepsProps['value'],
  totalValue: IProgressStepsProps['totalValue'],
) => {
  const stepsSize = size === 'small' ? theme.spaces.xs : theme.spaces.s;
  return StyleSheet.create({
    stepsBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    stepsWrapper: {
      width: totalValue * stepsSize + 8 * (totalValue - 1),
      display: 'flex',
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginRight: 8,
    },
    stepsProgress: {
      backgroundColor: theme.colors.primary,
      height: stepsSize,
      marginRight: 8,
      width: stepsSize * value + 8 * (value - 1),
      borderRadius: 8,
    },
    stepsText: {
      color: theme.colors.darkGrey,
    },
    dots: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    dot: {
      width: stepsSize,
      height: stepsSize,
      backgroundColor: theme.colors.gray,
      borderRadius: stepsSize,
    },
  });
};
export default getStyles;
