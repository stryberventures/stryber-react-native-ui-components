import {StyleSheet, Platform} from 'react-native';
import {defaultTheme} from '../other/constants';
const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    accessory: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    picker: {
      backgroundColor: 'rgba(255, 255, 255, 1.0)',
      borderBottomLeftRadius: theme.sizes.radius,
      borderBottomRightRadius: theme.sizes.radius,
      borderTopWidth: 0,
      position: 'absolute',
      ...Platform.select({
        ios: {
          shadowRadius: 1,
          shadowColor: 'rgba(0, 0, 0, 1.0)',
          shadowOpacity: 0.24,
          shadowOffset: {width: 0, height: 2},
        },
        android: {
          elevation: 2,
        },
      }),
    },
    scroll: {
      flex: 1,
    },
    scrollWrapper: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: theme.sizes.radius,
    },
    scrollContainer: {},
    item: {
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      paddingLeft: 28,
    },
    itemText: {
      color: theme.colors.gray70,
      fontSize: theme.fontSizes.body,
    },
    arrowButton: {},
  });
export default getStyles;
