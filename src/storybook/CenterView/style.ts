import {StyleSheet} from 'react-native';

const getStyles = (middle: boolean, bottom: boolean) =>
  StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    middle: middle
      ? {
          alignItems: 'center',
        }
      : {},
    bottom: bottom
      ? {
          justifyContent: 'flex-end',
        }
      : {},
  });

export default getStyles;
