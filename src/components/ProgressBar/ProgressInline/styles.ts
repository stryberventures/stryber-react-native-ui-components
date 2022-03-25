import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../../constants';
import {IProgressInlineProps} from './index';

const getStyles = (theme = defaultTheme, props: IProgressInlineProps) => {
  const inlineHeight =
    props.size === 'small' ? theme.spaces.xxs : theme.spaces.s;
  return StyleSheet.create({
    info: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    inlineBar: {
      height: inlineHeight,
      backgroundColor: theme.colors.gray,
      borderRadius: inlineHeight,
    },
    inlineProgress: {
      backgroundColor: theme.colors.primary,
      borderRadius: inlineHeight,
      width: `${(props.value / props.totalValue) * 100}%`,
    },
  });
};
export default getStyles;
