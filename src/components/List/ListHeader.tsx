import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {IListProps} from './index';
import getStyles from './styles';
import {useTheme} from '../Theme';

const ListHeader: React.FC<Partial<IListProps>> = props => {
  if (!props.titleText) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useTheme();

  const styles: any = getStyles(theme);

  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>{props.titleText}</Text>
      {props.titleLink && (
        <TouchableOpacity onPress={props.onTitleLinkPress}>
          <Text style={styles.titleLinkWrapper}>{props.titleLink}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListHeader;
