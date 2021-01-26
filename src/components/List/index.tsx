import React from 'react';
import {View, FlatList} from 'react-native';

import {ICheckboxProps} from '../Checkbox';
import {IButtonProps} from '../Button';
import {ISwitchProps} from '../Switch';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import Icons from '../Icons';

// All properties regarding checkboxes, images etc are placed inside IListItem not inside IListProps because of a requirement to have opportunity creat list with a different type of items.
export interface IListItem {
  value: string;
  valueStyles?: any;
  borderColor?: string;
  secondaryValue?: string;
  secondaryValueStyles?: any;
  longValue?: string;
  longValueStyles?: any;
  rightValue?: string;
  rightValueStyles?: any;
  cardText?: string;
  cardTextStyles?: any;
  withArrow?: boolean;
  arrowStyles?: any;
  image?: any;
  fullHeightImage?: boolean;
  icon?: keyof typeof Icons;
  iconProps?: any;
  iconBackground?: string;
  checkBox?: boolean;
  checkboxProps?: ICheckboxProps;
  radioButton?: boolean;
  radioButtonProps?: ICheckboxProps;
  switch?: boolean;
  switchProps?: ISwitchProps;
  button?: boolean;
  buttonChildren?: React.ReactNode;
  buttonProps?: IButtonProps;
}

export interface IListProps {
  data: IListItem[];
  onItemPress?: (item: IListItem) => void;
  titleText?: string;
  titleLink?: string;
  onTitleLinkPress?: () => void;
  keyExtractor?: (item: IListItem, index: number) => string;
}

const List: React.FC<IListProps> = props => {
  const keyExtractor = props.keyExtractor || ((_item, index) => `${index}`);

  const createItemProps = (item: any) => {
    const itemProps = {...item};
    itemProps.onItemPress = !props.onItemPress
      ? null
      : () => {
          if (props.onItemPress) {
            props.onItemPress(item);
          }
        };
    return itemProps;
  };

  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({item}) => {
          const itemProps = createItemProps(item);
          return <ListItem {...itemProps} />;
        }}
        ListHeaderComponent={
          <ListHeader
            titleText={props.titleText}
            titleLink={props.titleLink}
            onTitleLinkPress={props.onTitleLinkPress}
          />
        }
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

List.defaultProps = {
  data: [],
};

export default List;
