import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  LayoutChangeEvent,
} from 'react-native';

import Card from '../Card';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Switch from '../Switch';
import * as Icons from '../Icons';
import {IListItem} from './index';
import getStyles from './styles';
import {defaultTheme as theme} from '../other/constants';

interface IProps extends IListItem {
  onItemPress?: () => void;
}

const ListItem: React.FC<IProps> = props => {
  const [cardOpened, setCardOpened] = useState(false);
  const [fullHeightImageStyle, setFullHeightImageStyle] = useState({});

  const styles: any = getStyles(theme, props, cardOpened);

  const IconComponent = props.icon && Icons[props.icon];
  const showSimpleIcon = props.icon && !props.iconBackground;
  const showIconWithBackground = props.icon && props.iconBackground;

  const onPress = () => {
    // props.onItemPress && props.onItemPress();
    if (props.onItemPress) {
      props.onItemPress();
    }
    if (props.cardText) {
      setCardOpened(state => !state);
    }
  };

  const onImageLayout = (event: LayoutChangeEvent) => {
    if (props.image && props.fullHeightImage) {
      setFullHeightImageStyle({
        width: event.nativeEvent.layout.height,
      });
    }
  };

  return (
    <TouchableOpacity
      disabled={!props.cardText || !props.onItemPress}
      onPress={onPress}>
      <Card style={styles.cardStyle}>
        {showIconWithBackground && (
          <View style={styles.itemIconWrapper}>
            <IconComponent {...props.iconProps} />
          </View>
        )}
        {props.image && (
          <Image
            style={[styles.itemImage, fullHeightImageStyle]}
            source={props.image}
            onLayout={onImageLayout}
          />
        )}
        <View style={styles.itemTextWrapper}>
          <View style={styles.itemIconValueWrapper}>
            {showSimpleIcon && (
              <View style={styles.itemSimpleIconWrapper}>
                <IconComponent {...props.iconProps} />
              </View>
            )}
            <View>
              <Text style={styles.itemValue}>{props.value}</Text>
              {props.secondValue && (
                <Text style={styles.itemSecondValue}>{props.secondValue}</Text>
              )}
            </View>
          </View>
          <View style={styles.itemRightSideWrapper}>
            {props.rightValue && <Text>{props.rightValue}</Text>}
            {props.checkBox && <Checkbox {...props.checkboxProps} />}
            {props.radioButton && (
              <Checkbox {...props.radioButtonProps} radio />
            )}
            {props.button && (
              <Button {...props.buttonProps}>{props.buttonChildren}</Button>
            )}
            {props.switch && <Switch {...props.switchProps} />}
            {props.withArrow && <View style={styles.itemArrow} />}
          </View>
        </View>
        {cardOpened && (
          <View>
            <Text>{props.cardText}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default ListItem;
