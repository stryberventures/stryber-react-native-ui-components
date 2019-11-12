import {StyleSheet, Platform} from 'react-native';
import {defaultTheme} from '../../constants';

const getStyles = (theme = defaultTheme) =>
  StyleSheet.create({
    accessory: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },

    triangle: {
      width: 8,
      height: 8,
      transform: [
        {
          translateY: -4,
        },
        {
          rotate: '45deg',
        },
      ],
    },

    triangleContainer: {
      width: 12,
      height: 6,
      overflow: 'hidden',
      alignItems: 'center',

      backgroundColor: 'transparent',
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
    },

    picker: {
      backgroundColor: 'rgba(255, 255, 255, 1.0)',
      borderRadius: theme.sizes.radius,

      position: 'absolute',

      ...Platform.select({
        ios: {
          shadowRadius: 2,
          shadowColor: 'rgba(0, 0, 0, 1.0)',
          shadowOpacity: 0.54,
          shadowOffset: {width: 0, height: 2},
        },

        android: {
          elevation: 2,
        },
      }),
    },

    item: {
      textAlign: 'left',
    },

    scroll: {
      flex: 1,
      borderRadius: 2,
    },

    scrollContainer: {
      paddingVertical: 5,
    },
  });

export default getStyles;
