import {StyleSheet} from 'react-native';

import {IListItemProps} from './ListItem';

export const getCardListStyles = () =>
  StyleSheet.create({
    listWrapper: {
      flexDirection: 'row',
    },
  });

export const getListHeaderStyles = (theme: any) => {
  return StyleSheet.create({
    titleWrapper: {
      marginBottom: 10,
    },
    title: {
      fontFamily: theme.fonts.fontFamily,
      color: theme.colors.black,
      fontSize: theme.fontSizes.body,
    },
  });
};

export const getListItemStyles = (theme: any, props: IListItemProps) => {
  const quizBackground = props.quizBackground
    ? theme.colors[props.quizBackground] || props.quizBackground
    : theme.colors.primary;
  const cardBorderColor = props.isActive
    ? quizBackground
    : props.cardBackground
    ? theme.colors[props.cardBackground] || props.cardBackground
    : 'transparent';
  const quizBTextColor = props.quizTextColor
    ? theme.colors[props.quizTextColor] || props.quizTextColor
    : theme.colors.white;
  const textColor = props.textColor
    ? theme.colors[props.textColor] || props.textColor
    : theme.colors.black;

  return StyleSheet.create({
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
