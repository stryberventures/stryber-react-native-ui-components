import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';
import {NUMBER_OF_LINES, MAX_NUMBER_OF_LINES} from './constants';

const getStyles = ({
  theme = defaultTheme,
  multiline = false,
  numberOfLines = NUMBER_OF_LINES,
  maxNumberOfLines = MAX_NUMBER_OF_LINES,
}) =>
  StyleSheet.create({
    container: {},
    inputBox: {
      minHeight: multiline
        ? theme.fontSizes.body * 1.8 * numberOfLines
        : theme.sizes.inputHeight,
      maxHeight: multiline
        ? theme.fontSizes.body * 1.8 * maxNumberOfLines
        : theme.sizes.inputHeight,
      justifyContent: multiline ? 'flex-start' : 'center',
      paddingLeft: 20,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: theme.colors.gray15,
      borderRadius: theme.sizes.radius,
    },
    input: {
      marginTop: multiline ? 10 : 0,
      paddingTop: 0,
      borderWidth: 0,
      fontFamily: theme.fonts.fontFamily,
      fontSize: theme.fontSizes.body,
      lineHeight: theme.fontSizes.body * 1.5,
      color: theme.colors.gray70,
      textAlignVertical: multiline ? 'top' : 'center',
    },
  });
export default getStyles;
