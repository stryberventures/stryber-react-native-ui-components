import React from 'react';
import {View, Text} from 'react-native';

import {ICardList} from './index';
import {getListHeaderStyles} from './styles';
import {useTheme} from '../Theme';

const ListHeader: React.FC<Partial<ICardList>> = props => {
  if (!props.title) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useTheme();
  const styles = getListHeaderStyles(theme);

  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default ListHeader;
