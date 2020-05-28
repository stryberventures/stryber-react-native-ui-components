import {StyleSheet} from 'react-native';

import {IProps} from './index';

const getStyles = (theme: any, props?: Partial<IProps>) => {
  const cardBackground = props && props.cardBackground
    ? theme.colors[props.cardBackground] || props.cardBackground
    : theme.colors.white;
  const quizBackground =
    props && props.quizBackground
      ? theme.colors[props.quizBackground] || props.quizBackground
      : theme.colors.primary;
  const quizBTextColor =
    props && props.quizTextColor
      ? theme.colors[props.quizTextColor] || props.quizTextColor
      : theme.colors.white;
  const textColor =
    props && props.textColor
      ? theme.colors[props.textColor] || props.textColor
      : theme.colors.black;

  return StyleSheet.create({
    cardStyle: {
      backgroundColor: cardBackground,
    },
    titleWrapper: {
      marginBottom: 10,
    },
    title: {
      fontFamily: theme.fonts.fontFamily,
      color: theme.colors.black,
      fontSize: theme.fontSizes.body,
    },
    quizWrapper: {
      backgroundColor: quizBackground,
      width: theme.spaces.xxl5,
      height: theme.spaces.xxl5,
      borderRadius: theme.sizes.radius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quizText: {
      color: quizBTextColor,
      fontFamily: theme.fonts.fontFamily,
      fontSize: theme.fontSizes.headline,
    },
    text: {
      fontFamily: theme.fonts.fontFamily,
      color: textColor,
      fontSize: theme.fontSizes.body,
    },
    secondaryText: {
      fontFamily: theme.fonts.fontFamily,
      color: textColor,
      fontSize: 10,
    },
    textWrapper: {
      flexDirection: 'column',
    },
  });
};
export default getStyles;
