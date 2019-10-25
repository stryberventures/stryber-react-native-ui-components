import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    header: {
      height: theme.sizes.header,
      backgroundColor: theme.colors.primary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    headerText: {
      fontSize: 18,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      paddingTop: 2,
      width: '52%',
      textAlign: 'center',
    },
    leftIcon: {
      height: 24,
      width: 44,
      position: 'absolute',
      left: 10,
      fontSize: 24,
    },
  });

export default getStyles;
