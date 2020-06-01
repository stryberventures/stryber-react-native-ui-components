import React from 'react';
import {FlatList, View} from 'react-native';

import {ICheckboxProps} from '../Checkbox';
import {defaultTheme as theme} from '../other/constants';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import getStyles from './styles';

export interface IListItem {
  text: string;
  secondaryText?: string;
  checkboxProps?: ICheckboxProps;
  radiobuttonProps?: ICheckboxProps;
  quizCounter?: string | number;
}

export interface IProps {
  data: IListItem[];
  title?: string;
  checkboxLeft?: boolean;
  checkboxRight?: boolean;
  radiobuttonLeft?: boolean;
  radiobuttonRight?: boolean;
  quiz?: boolean;
  quizBackground?: string;
  quizTextColor?: string;
  cardBackground?: string;
  textColor?: string;
  keyExtractor?: (item: IListItem, index: number) => string;
}

const CardList: React.FC<IProps> = props => {
  const keyExtractor = props.keyExtractor || ((_item, index) => `${index}`);
  const styles = getStyles(theme, props);

  const renderItem = ({item}: {item: IListItem}) => (
    <ListItem
      {...item}
      checkboxLeft={props.checkboxLeft}
      checkboxRight={props.checkboxRight}
      radiobuttonLeft={props.radiobuttonLeft}
      radiobuttonRight={props.radiobuttonRight}
      quiz={props.quiz}
      quizBackground={props.quizBackground}
      quizTextColor={props.quizTextColor}
      cardBackground={props.cardBackground}
      textColor={props.textColor}
    />
  );

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader title={props.title} />}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

CardList.defaultProps = {
  data: [],
};

export default CardList;
