import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';

import Card from '../Card';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Switch from '../Switch';
import * as Icons from '../Icons';
import {IListItem} from './index';

interface IProps extends IListItem {
  onItemPress?: () => void;
}

const ListItem: React.FC<IProps> = props => {
  const [openCard, setOpenCard] = useState(false);

  const IconComponent = props.icon && Icons[props.icon];

  const onPress = () => {
    // props.onItemPress && props.onItemPress();
    if (props.onItemPress) {
      props.onItemPress();
    }
    if (props.cardText) {
      setOpenCard(state => !state);
    }
  };

  return (
    <TouchableOpacity
      disabled={!props.cardText || !props.onItemPress}
      onPress={onPress}>
      <Card>
        {props.icon && (
          <View>
            <IconComponent {...props.iconProps} />
          </View>
        )}
        {props.image && <Image source={props.image} />}
        <View>
          <View>
            <Text>{props.value}</Text>
            {props.secondValue && <Text>{props.secondValue}</Text>}
          </View>
          <View>
            {props.rightValue && <Text>{props.rightValue}</Text>}
            {props.withArrow && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRightWidth: 2,
                  borderTopWidth: 2,
                  borderColor: 'grey',
                  transform: [{rotate: '45deg'}],
                }}
              />
            )}
            {props.checkBox && <Checkbox {...props.checkboxProps} />}
            {props.radioButton && (
              <Checkbox {...props.radioButtonProps} radio />
            )}
            {props.button && (
              <Button {...props.buttonProps}>{props.buttonChildren}</Button>
            )}
            {props.switch && <Switch {...props.switchProps} />}
          </View>
        </View>
        {openCard && (
          <View>
            <Text>{props.cardText}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default ListItem;
