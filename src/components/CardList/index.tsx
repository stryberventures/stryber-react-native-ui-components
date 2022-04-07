import React, {useState} from 'react';
import {FlatList, View} from 'react-native';

import {ICheckboxProps} from '../Checkbox';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import {getCardListStyles} from './styles';
import {ThemeType} from '../Theme';

export interface ICardListItem {
  text: string;
  secondaryText?: string;
  checkboxProps?: ICheckboxProps;
  radiobuttonProps?: ICheckboxProps;
  quizCounter?: string | number;
}

export interface ICardList {
  data: ICardListItem[];
  title?: string;
  checkboxLeft?: boolean;
  checkboxRight?: boolean;
  radiobuttonLeft?: boolean;
  radiobuttonRight?: boolean;
  quiz?: boolean;
  quizBackground?: string;
  quizTextColor?: keyof ThemeType['colors'] | string;
  cardBackground?: keyof ThemeType['colors'] | string;
  textColor?: string;
  keyExtractor?: (item: ICardListItem, index: number) => string;
  onQuizPress?: (item?: ICardListItem, index?: number) => void;
  defaultIndex?: number;
  multiSelect?: boolean;
  scrollEnabled?: boolean;
}

const CardList: React.FC<ICardList> = props => {
  const styles = getCardListStyles();

  const [activeIndexes, setActiveIndexes] = useState(
    props.defaultIndex !== undefined ? [props.defaultIndex] : [],
  );

  const keyExtractor = props.keyExtractor || ((_item, index) => `${index}`);

  const renderItem = ({item, index}: {item: ICardListItem; index: number}) => {
    const onQuizPress = () => {
      setActiveIndexes(state => {
        if (props.multiSelect) {
          return state.includes(index)
            ? state.filter(element => element !== index)
            : [...state, index];
        }
        return state.includes(index) ? [] : [index];
      });
      if (props.onQuizPress) {
        props.onQuizPress(item, index);
      }
    };
    return (
      <ListItem
        {...item}
        isActive={activeIndexes.includes(index)}
        onQuizPress={onQuizPress}
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
  };

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader title={props.title} />}
        keyExtractor={keyExtractor}
        scrollEnabled={props.scrollEnabled}
      />
    </View>
  );
};

CardList.defaultProps = {
  data: [],
  multiSelect: true,
  scrollEnabled: true,
};

export default CardList;
