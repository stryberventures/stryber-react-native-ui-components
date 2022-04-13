import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../../constants';
import {ITagProps} from './index';
import {ThemeType} from '../../Theme';

interface ITagStylesProps {
  disabled: ITagProps['disabled'];
  color: ITagProps['color'];
  disabledColor: ITagProps['disabledColor'];
  textColor: ITagProps['textColor'];
  size: ITagProps['size'];
  shape: ITagProps['shape'];
  selectedColor: ITagProps['selectedColor'];
  shadow: ITagProps['shadow'];
}

const getStyles = (
  theme: ThemeType = defaultTheme,
  props: ITagStylesProps,
  selected: boolean,
) => {
  const propsColorValue =
    theme.colors[props.color as keyof ThemeType['colors']] || props.color;
  const primaryColor = propsColorValue || theme.colors.primary;
  const textColor = props.disabled
    ? props.disabledColor || theme.colors.gray50
    : selected
    ? props.selectedColor || theme.colors.white
    : props.textColor
    ? props.textColor
    : primaryColor;
  const tagHeight =
    props.size === 'small' ? theme.spaces.xxl2 : theme.spaces.xxl5;
  const borderRadius =
    props.shape === 'rounded'
      ? theme.sizes.radius
      : props.shape === 'round'
      ? theme.sizes.largeRadius
      : 0;
  const shadow = props.shadow
    ? {
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }
    : {};
  const paddingHorizontal =
    props.size === 'small' ? theme.spaces.m : theme.spaces.xl;
  const tagConfig = props.disabled
    ? props.disabledColor
      ? {
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderColor: props.disabledColor,
        }
      : {
          backgroundColor: theme.colors.gray15,
          opacity: 0.7,
        }
    : selected
    ? props.selectedColor
      ? {
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderColor: props.selectedColor,
        }
      : {
          backgroundColor: primaryColor,
        }
    : {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: primaryColor,
      };
  return StyleSheet.create({
    tag: {
      height: tagHeight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: paddingHorizontal,
      marginVertical: theme.spaces.xs,
      marginRight: theme.spaces.s,
      borderRadius: borderRadius,
      ...shadow,
      ...tagConfig,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tagText: {
      fontSize: theme.fontSizes.button,
      fontWeight: 'normal',
      color: textColor,
    },
    closeButton: {
      height: theme.spaces.s,
      width: theme.spaces.s,
      marginLeft: theme.spaces.s,
    },
  });
};
export default getStyles;
