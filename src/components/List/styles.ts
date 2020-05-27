import {StyleSheet} from 'react-native';

import {IListItem} from './index';

const getStyles = (theme: any, props?: IListItem, cardOpened = false) => {
  const listIsSimple =
    props && (!!props.button || (!props.iconBackground && !props.image));
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
    itemWrapper: {
      borderRadius: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemLeftWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    itemRightWrapper: {
      flexDirection: 'column',
      flex: 1,
    },
    itemTextWrapper: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: cardOpened ? 0 : 1,
      borderColor: theme.colors.gray50,
      paddingRight: theme.spaces.m,
      paddingVertical: listIsSimple ? theme.spaces.s : theme.spaces.xl,
      paddingLeft: fullHeightImage ? theme.spaces.m : undefined,
    },
    itemControlsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    alignedControlsWrapper: {
      alignSelf: 'flex-start',
    },
    itemValue: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.button,
      fontFamily: theme.fonts.fontFamily,
    },
    itemSecondaryValue: {
      color: theme.colors.gray50,
      fontSize: 10,
      fontFamily: theme.fonts.fontFamily,
      marginTop: theme.spaces.xxs,
    },
    itemRightValue: {
      color: theme.colors.gray50,
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fonts.fontFamily,
    },
    itemCardText: {
      color: theme.colors.gray50,
      fontSize: theme.fontSizes.subhead,
      fontFamily: theme.fonts.fontFamily,
    },
    itemArrow: {
      width: 10,
      height: 10,
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderColor: theme.colors.gray50,
      transform: [{rotate: '45deg'}],
      marginLeft: theme.spaces.s,
      marginBottom: cardOpened ? theme.spaces.xxs : 0,
    },
    itemArrowDown: {
      transform: [{rotate: '135deg'}],
    },
    itemIconValueWrapper: {
      flex: 1,
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
      width: fullHeightImage ? '100%' : theme.spaces.xxl5,
      height: fullHeightImage ? '100%' : theme.spaces.xxl5,
      borderRadius: fullHeightImage ? undefined : theme.spaces.xxs,
      marginRight: fullHeightImage ? undefined : theme.spaces.m,
    },
    itemOpenedTextWrapper: {
      paddingRight: theme.spaces.m,
      paddingLeft: fullHeightImage ? theme.spaces.m : undefined,
      marginBottom: listIsSimple ? theme.spaces.s : theme.spaces.xl,
    },
    itemOpenedText: {
      color: theme.colors.gray50,
      fontSize: theme.fontSizes.subhead,
      fontFamily: theme.fonts.fontFamily,
    },
  });
};
export default getStyles;
