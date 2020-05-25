import {StyleSheet} from 'react-native';

import {IListItem} from './index';

const getStyles = (theme: any, props?: IListItem, cardOpened = false) => {
  const listIsSimple = props && (!props.iconBackground && !props.image);
  const fullHeightImage = props && props.image && props.fullHeightImage;

  return StyleSheet.create({
    headerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spaces.xxl5,
    },
    title: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.h3,
      fontFamily: theme.fonts.fontFamily,
    },
    titleLink: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.button,
      fontFamily: theme.fonts.fontFamily,
    },
    cardStyle: {
      borderRadius: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTextWrapper: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: theme.colors.gray50,
      paddingRight: theme.spaces.m,
      paddingVertical: listIsSimple ? theme.spaces.s : theme.spaces.xl,
      paddingLeft: fullHeightImage ? theme.spaces.m : undefined,
    },
    itemRightSideWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemValue: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.button,
      fontFamily: theme.fonts.fontFamily,
    },
    itemSecondValue: {
      color: theme.colors.gray50,
      fontSize: 10,
      fontFamily: theme.fonts.fontFamily,
      marginTop: theme.spaces.xxs,
    },
    itemArrow: {
      width: 10,
      height: 10,
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderColor: theme.colors.gray50,
      transform: [{rotate: cardOpened ? '135deg' : '45deg'}],
      marginLeft: theme.spaces.s,
      marginBottom: cardOpened ? theme.spaces.xxs : 0,
    },
    itemIconValueWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSimpleIconWrapper: {
      marginRight: theme.spaces.s,
    },
    itemIconWrapper: {
      width: theme.spaces.xxl5,
      height: theme.spaces.xxl5,
      borderRadius: theme.spaces.xxs,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spaces.m,
      backgroundColor:
        props && props.iconBackground
          ? props.iconBackground
          : theme.colors.primary,
    },
    itemImage: {
      width: theme.spaces.xxl5,
      height: fullHeightImage ? '100%' : theme.spaces.xxl5,
      borderRadius: fullHeightImage ? undefined : theme.spaces.xxs,
      marginRight: fullHeightImage ? undefined : theme.spaces.m,
    },
  });
};
export default getStyles;
