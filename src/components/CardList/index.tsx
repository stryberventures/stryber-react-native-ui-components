import React from 'react';
import {FlatList} from 'react-native';

import {ICheckboxProps} from '../Checkbox';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

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

  const renderItem = ({item}: {item: IListItem}) => (
    <ListItem
      {...item}
      checkboxLeft={props.checkboxLeft}
      checkboxRight={props.checkboxRight}
      radiobuttonLeft={props.radiobuttonLeft}
      radiobuttonRight={props.radiobuttonRight}
      quiz={props.quiz}
    />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      ListHeaderComponent={<ListHeader title={props.title} />}
      keyExtractor={keyExtractor}
    />
  );
};

CardList.defaultProps = {
  data: [],
};

export default CardList;
