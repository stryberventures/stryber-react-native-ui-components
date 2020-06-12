import {StyleSheet} from 'react-native';

import {IProps} from './index';
import {IListItemProps} from './ListItem';

const getStyles = (theme: any, props?: IProps | IListItemProps) => {
  const quizBackground =
    props && props.quizBackground
      ? theme.colors[props.quizBackground] || props.quizBackground
      : theme.colors.primary;
  const cardBorderColor =
    props && 'isActive' in props && props.isActive
      ? quizBackground
      : props && props.cardBackground
      ? theme.colors[props.cardBackground] || props.cardBackground
      : 'transparent';
  const quizBTextColor =
    props && props.quizTextColor
      ? theme.colors[props.quizTextColor] || props.quizTextColor
      : theme.colors.white;
  const textColor =
    props && props.textColor
      ? theme.colors[props.textColor] || props.textColor
      : theme.colors.black;

  return StyleSheet.create({
    listWrapper: {
      flexDirection: 'row',
    },
    cardStyle: {
      borderWidth: 1,
      borderColor: cardBorderColor,
      padding: theme.spaces.m,
      marginTop: 2,
      marginBottom: theme.spaces.m,
      width: '99%',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
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
      marginTop: 10,
    },
    textWrapper: {
      flexDirection: 'column',
      flex: 1,
    },
    rightElementWrapper: {
      marginLeft: theme.spaces.xxl8,
    },
    leftElementWrapper: {
      marginRight: theme.spaces.xxl8,
    },
  });
};
export default getStyles;
