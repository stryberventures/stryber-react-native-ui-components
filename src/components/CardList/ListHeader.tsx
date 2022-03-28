import React from 'react';
import {View, Text} from 'react-native';

import {ICardList} from './index';
import {getListHeaderStyles} from './styles';
import {defaultTheme as theme} from '../../constants';

const ListHeader: React.FC<Partial<ICardList>> = props => {
  if (!props.title) return null;
  const styles = getListHeaderStyles(theme);

  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default ListHeader;
