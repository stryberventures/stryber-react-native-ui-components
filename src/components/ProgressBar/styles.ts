import {StyleSheet } from 'react-native';
import {defaultTheme} from '../other/constants';
import {IProgressBarProps} from './index';

const getStyles = (theme = defaultTheme, props: IProgressBarProps) => {
  const inlineHeight = props.size == "small" ? theme.spaces.xxs : theme.spaces.s;
  const stepsHeight = props.size == "small" ? theme.spaces.xs : theme.spaces.s;
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    info: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    inlineBar: {
      height: inlineHeight,
      backgroundColor: theme.colors.gray,
      borderRadius: inlineHeight
    },
    inlineProgress: {
      backgroundColor: theme.colors.blue,
      borderRadius: inlineHeight,
      width: `${props.value / props.totalValue*100}%`
    },
    stepsBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    stepsWrapper: {
      width: props.totalValue * stepsHeight + + 8 * (props.totalValue - 1),
      display: 'flex',
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginRight: 8
    },
    stepsProgress: {
      backgroundColor: theme.colors.blue,
      height: stepsHeight,
      marginRight: 8,
      width: stepsHeight * props.value + 8 * (props.value - 1),
      borderRadius: 8
    },
    stepsText: {
      color: theme.colors.darkGrey
    },
    dots: {
      position: 'relative',
      display: "flex",
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    dot: {
      width: stepsHeight,
      height: stepsHeight,
      backgroundColor: theme.colors.gray,
      borderRadius: stepsHeight
    },
  });
}
export default getStyles;
