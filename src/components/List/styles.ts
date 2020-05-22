import {StyleSheet} from 'react-native';

import {IListItem, IListProps} from './index';

const getStyles = (
  theme: any,
  props: Partial<IListItem> & Partial<IListProps>,
) => {
  return StyleSheet.create({
    headerWrapper: {
      // borderBottomWidth: 2,
      // borderColor: theme.colors.gray50,
    },
    title: {
      color: theme.colors.gray50,
    },
    titleLinkWrapper: {
      backgroundColor: 'pink',
    },
    titleLink: {
      color: theme.colors.black,
    },
  });
};
export default getStyles;
