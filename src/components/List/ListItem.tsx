import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  LayoutChangeEvent,
} from 'react-native';

import Checkbox from '../Checkbox';
import Button from '../Button';
import Switch from '../Switch';
import Icons from '../Icons';
import {IListItem} from './index';
import getStyles from './styles';
import {defaultTheme as theme} from '../other/constants';

interface IProps extends IListItem {
  onItemPress?: () => void;
}

const ListItem: React.FC<IProps> = props => {
  const [cardOpened, setCardOpened] = useState(false);
  const [leftWrapperStyles, setLeftWrapperStyles] = useState({
    width: 0,
    height: 0,
  });

  const styles: any = getStyles(theme, props, cardOpened);

  // @ts-ignore
  const IconComponent = props.icon && Icons[props.icon];
  const showSimpleIcon = props.icon && !props.iconBackground;
  const showIconWithBackground = props.icon && props.iconBackground;

  const onPress = () => {
    props.onItemPress && props.onItemPress();
    props.cardText && setCardOpened(state => !state);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    // itemTextWrapper will be higher if item includes multiline text
    const sideLength = props.longValue ? 71 : event.nativeEvent.layout.height;
    setLeftWrapperStyles({
      width: sideLength,
      height: sideLength,
    });
  };

  return (
    <TouchableOpacity
      disabled={!props.cardText && !props.onItemPress}
      onPress={onPress}
      style={styles.itemWrapper}>
      {showIconWithBackground && (
        <View style={[styles.itemLeftWrapper, leftWrapperStyles]}>
          <View style={styles.itemIconWrapper}>
            <IconComponent {...props.iconProps} />
          </View>
        </View>
      )}
      {props.image && (
        <View style={[styles.itemLeftWrapper, leftWrapperStyles]}>
          <Image style={styles.itemImage} source={props.image} />
        </View>
      )}
      <View style={styles.itemRightWrapper}>
        <View style={styles.itemTextWrapper} onLayout={onLayout}>
          <View style={styles.itemIconValueWrapper}>
            {showSimpleIcon && (
              <View style={styles.itemSimpleIconWrapper}>
                <IconComponent {...props.iconProps} />
              </View>
            )}
            <View>
              <Text style={[styles.itemValue, props.valueStyles]}>
                {props.value}
              </Text>
              {props.secondaryValue && (
                <Text
                  style={[
                    styles.itemSecondaryValue,
                    props.secondaryValueStyles,
                  ]}>
                  {props.secondaryValue}
                </Text>
              )}
              {props.longValue && (
                <Text
                  style={[styles.itemSecondaryValue, props.longValueStyles]}>
                  {props.longValue}
                </Text>
              )}
            </View>
          </View>
          <View
            style={[
              styles.itemControlsWrapper,
              props.longValue &&
                (props.image || props.iconBackground) &&
                styles.alignedControlsWrapper,
            ]}>
            {props.rightValue && (
              <Text style={[styles.itemRightValue, props.rightValueStyles]}>
                {props.rightValue}
              </Text>
            )}
            {props.checkBox && (
              <View>
                <Checkbox {...props.checkboxProps} />
              </View>
            )}
            {props.radioButton && (
              <View>
                <Checkbox {...props.radioButtonProps} radio />
              </View>
            )}
            {props.button && (
              <Button {...props.buttonProps}>{props.buttonChildren}</Button>
            )}
            {props.switch && <Switch {...props.switchProps} />}
            {props.withArrow && (
              <View
                style={[
                  styles.itemArrow,
                  cardOpened && styles.itemArrowDown,
                  props.arrowStyles,
                ]}
              />
            )}
          </View>
        </View>
        {cardOpened && (
          <View style={styles.itemOpenedTextWrapper}>
            <Text style={[styles.itemCardText, props.cardTextStyles]}>
              {props.cardText}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
