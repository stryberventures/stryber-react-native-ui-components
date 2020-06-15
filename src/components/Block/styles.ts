import {StyleSheet} from 'react-native';

import {defaultTheme} from '../other/constants';
import {IBlockProps} from './index';

const getStyles = (theme = defaultTheme, props: IBlockProps) =>
  StyleSheet.create({
    block: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    card: {
      borderRadius: theme.sizes.radius,
    },
    center: {
      alignItems: 'center',
    },
    middle: {
      justifyContent: 'center',
    },
    left: {
      justifyContent: 'flex-start',
    },
    right: {
      justifyContent: 'flex-end',
    },
    top: {
      justifyContent: 'flex-start',
    },
    bottom: {
      justifyContent: 'flex-end',
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: props.shadowTwo ? 5 : 2,
      },
      shadowOpacity: props.shadowTwo ? 0.5 : 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    accent: {backgroundColor: theme.colors.accent},
    primary: {backgroundColor: theme.colors.primary},
    secondary: {backgroundColor: theme.colors.secondary},
    tertiary: {backgroundColor: theme.colors.tertiary},
    black: {backgroundColor: theme.colors.black},
    white: {backgroundColor: theme.colors.white},
    gray: {backgroundColor: theme.colors.gray},
    gray2: {backgroundColor: theme.colors.gray2},
  });
export default getStyles;
