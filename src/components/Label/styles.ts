import {StyleSheet} from 'react-native';
// @ts-ignore
import {merge} from 'lodash-es';
import {defaultTheme} from '../other/constants';

export const getStyles = ({theme = defaultTheme, classes = {}}) => {
  const ownClasses = {
    container: {
      marginBottom: theme.spaces.xxs,
    },
    text: {
      fontFamily: theme.fonts.fontFamily,
      fontSize: theme.fontSizes.body,
      color: theme.colors.gray70,
    },
    textDisabled: {
      color: theme.colors.gray15,
    },
    textError: {
      color: theme.colors.accent2,
    },
  };

  // @ts-ignore
  return StyleSheet.create(merge(ownClasses, classes));
};
