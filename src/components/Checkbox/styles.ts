import {StyleSheet} from 'react-native';
import {defaultTheme} from '../other/constants';

const getStyles = ({
  theme = defaultTheme,
  checked = false,
  radio = false,
  disabled = false,
  error = false,
  size = 'regular',
}) => {
  const checkboxSizes =
    // @ts-ignore
    theme.sizes.checkbox[size] || theme.sizes.checkbox.regular;
  const radioRadius =
    // @ts-ignore
    theme.sizes.radioRadius[size] || theme.sizes.radioRadius.regular;
  return StyleSheet.create({
    wrapper: {
      marginVertical: theme.spaces.xs,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    textContainer: {
      marginLeft: theme.spaces.xs,
    },
    checkbox: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: error
        ? checked
          ? theme.colors.accent2
          : 'transparent'
        : disabled
        ? theme.colors.gray15
          ? theme.colors.gray15
          : 'transparent'
        : checked
        ? theme.colors.primary
        : 'transparent',
      borderColor: error
        ? checked
          ? theme.colors.accent2
          : theme.colors.gray15
        : disabled
        ? checked
          ? theme.colors.gray15
          : theme.colors.gray15
        : checked
        ? theme.colors.primary
        : theme.colors.gray15,
      // @ts-ignore
      height: checkboxSizes.box,
      // @ts-ignore
      width: checkboxSizes.box,
      borderRadius: radio ? checkboxSizes.box / 2 : 3,
      opacity: disabled ? 0.5 : 1,
    },
    radioIcon: {
      width: radioRadius * 2,
      height: radioRadius * 2,
      borderRadius: radioRadius,
      backgroundColor: '#fff',
    },
    textStyle: {
      fontSize:
        size === 'large' ? theme.fontSizes.body : theme.fontSizes.subhead,
      color: disabled ? theme.colors.gray15 : theme.colors.black,
    },
    errorContainer: {
      marginTop: theme.spaces.m,
    },
    errorText: {
      fontSize: theme.fontSizes.caption,
      color: theme.colors.accent2,
    },
    textStyleDisabled: {
      color: theme.colors.gray15,
    },
    textStyleError: {
      color: theme.colors.accent2,
    },
  });
};

export default getStyles;
