import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import DropdownItem from '../DropdownItem';
import Input, {IInputProps} from '../Input';
import InputBase from '../Input/InputBase';
import Text from '../Text';
import {ArrowDown} from '../Icons';
import getStyles from './styles';
import {useTheme} from '../Theme';

interface IDropdownProps {
  name?: string;
  disabled?: boolean;
  value?: string | number;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  variant?: IInputProps['variant'];
  hitSlop?: {};
  data: any[];
  valueExtractor?: (...args: any[]) => any;
  labelExtractor?: (...args: any[]) => any;
  propsExtractor?: (...args: any[]) => any;
  absoluteRTLLayout?: boolean;
  dropdownOffset?: {
    top: number;
    left: number;
  };
  dropdownMargins?: {
    min: number;
    max: number;
  };
  dropdownPosition?: number;
  animationDuration?: number;
  fontSize?: number;
  color?: string;
  textColor?: string;
  itemColor?: string;
  itemBgColor?: string;
  baseColor?: string;
  itemCount?: number;
  itemPadding?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  useNativeDriver?: boolean;
  containerStyle?: any;
  overlayStyle?: any;
  pickerStyle?: any;
  pressRetentionOffset?: any;
  testID?: any;
  nativeID?: any;
  accessible?: any;
  accessibilityLabel?: any;
  selectedItemColor?: any;
  disabledItemColor?: any;
  itemTextStyle?: any;
  error?: string;
}

type DropdownState = {
  opacity?: any;
  selected?: number;
  modal?: boolean;
  value?: any;
  width?: number;
  top?: number;
  left?: number;
  leftInset?: number;
  rightInset?: number;
  listOnTop?: boolean;
};

const Dropdown: FC<IDropdownProps> = props => {
  const {theme} = useTheme();
  const {
    containerStyle,
    overlayStyle: overlayStyleOverrides,
    pickerStyle: pickerStyleOverrides,
    hitSlop,
    pressRetentionOffset,
    testID,
    nativeID,
    accessible,
    accessibilityLabel,
    value,
    data,
    disabled,
    onFocus,
    dropdownOffset,
    // @ts-ignore
    dropdownMargins: {min: minMargin, max: maxMargin},
    animationDuration,
    useNativeDriver = false,
    valueExtractor,
    itemCount,
    dropdownPosition,
    onBlur,
    onChange,
    name,
    label,
    placeholder,
    variant,
    color,
    textColor = theme.colors.gray70,
    itemColor = theme.colors.gray70,
    itemBgColor = theme.colors.white,
    baseColor = theme.colors.gray,
    selectedItemColor = textColor,
    disabledItemColor = baseColor,
    fontSize,
    itemTextStyle,
    labelExtractor,
    onLayout,
    propsExtractor,
  } = props;
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    opacity: new Animated.Value(0),
    selected: -1,
    modal: false,
    value: value || '',
    listOnTop: false,
  });
  const isMountedRef = useRef(false);
  const isFocusedRef = useRef(false);
  const inputRef = useRef<InputBase>(null);
  const listContainerRef = useRef<View>(null);
  const scrollRef = useRef<FlatList>(null);
  const itemSize = theme.spaces.xxl5;

  const styles = getStyles(theme, dropdownState.listOnTop);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  const selectedIndex = () => {
    const {value: currentValue} = dropdownState;
    return data!.findIndex(
      item => item != null && currentValue === valueExtractor!(item),
    );
  };

  const getVisibleItemCount = () => Math.min(data!.length, itemCount!);

  const getTailItemCount = () => Math.max(getVisibleItemCount() - 2, 0);

  const resetScrollOffset = () => {
    const {selected} = dropdownState;
    let offset = 0;
    const dataItemCount = data!.length;
    const tailItemCount = getTailItemCount();
    const visibleItemCount = getVisibleItemCount();
    if (dataItemCount > visibleItemCount) {
      if (dropdownPosition == null) {
        switch (selected) {
          case -1:
            break;
          case 0:
          case 1:
            break;
          default:
            if (selected! >= dataItemCount - tailItemCount) {
              offset = itemSize * (dataItemCount - visibleItemCount);
            } else {
              offset = itemSize * (selected! - 1);
            }
        }
      } else {
        let index = selected! - dropdownPosition;
        if (dropdownPosition < 0) {
          index -= visibleItemCount;
        }
        index = Math.max(0, index);
        index = Math.min(index, dataItemCount - visibleItemCount);
        if (selected! >= 0) {
          offset = itemSize * index;
        }
      }
    }
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({offset, animated: false});
    }
  };

  const onPress = () => {
    if (disabled) {
      return;
    }
    const dataItemCount = data!.length;
    if (!dataItemCount) {
      return;
    }
    isFocusedRef.current = true;
    if (typeof onFocus === 'function') {
      onFocus();
    }
    inputRef.current!.onFocus();
    const dimensions = Dimensions.get('window');
    listContainerRef.current!.measureInWindow(
      (x: number, y: number, containerWidth: number) => {
        const {opacity} = dropdownState;
        const selected = selectedIndex();
        let leftInset: number;
        let left = x + dropdownOffset!.left - maxMargin;
        if (left > minMargin) {
          leftInset = maxMargin;
        } else {
          left = minMargin;
          leftInset = minMargin;
        }
        let right = x + containerWidth + maxMargin;
        let rightInset: number;
        if (dimensions.width - right > minMargin) {
          rightInset = maxMargin;
        } else {
          right = dimensions.width - minMargin;
          rightInset = minMargin;
        }
        const visibleItemCount = getVisibleItemCount();
        const height = itemSize * visibleItemCount;
        const listOnTop = dimensions.height < y + height;
        const top = listOnTop ? y - height - theme.sizes.inputHeight : y;
        setDropdownState(state => ({
          ...state,
          modal: true,
          width: right - left,
          top,
          left,
          leftInset,
          rightInset,
          selected,
          listOnTop,
        }));

        if (isMountedRef.current) {
          resetScrollOffset();
          Animated.timing(opacity, {
            duration: animationDuration,
            toValue: 1,
            useNativeDriver,
          }).start(() => {
            if (isMountedRef.current && Platform.OS === 'ios') {
              const {flashScrollIndicators} = scrollRef.current || {};
              if (typeof flashScrollIndicators === 'function') {
                flashScrollIndicators.call(scrollRef.current);
              }
            }
          });
        }
      },
    );
  };

  const onClose = () => {
    const {opacity} = dropdownState;
    Animated.timing(opacity, {
      duration: animationDuration,
      toValue: 0,
      useNativeDriver,
    }).start(() => {
      isFocusedRef.current = false;
      if (typeof onBlur === 'function') {
        onBlur();
      }
      inputRef.current!.onBlur();
    });
  };

  const onSelect = (index: number) => {
    const currentVal = valueExtractor!(data![index]);
    if (typeof onChange === 'function') {
      onChange(currentVal, name, index);
    }
    if (isMountedRef.current) {
      setDropdownState(state => ({
        ...state,
        value: currentVal,
        modal: false,
      }));
      inputRef.current!.setValue(currentVal.toString());
    }
    onClose();
  };

  const renderBase = () => {
    const angle = dropdownState.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <Input
        inputStyle={styles.input}
        value={String(dropdownState.value)}
        disabled={disabled}
        variant={variant}
        label={label}
        placeholder={placeholder}
        ref={inputRef}
        rightIcon={() => (
          <>
            <View style={styles.arrowButton}>
              <Animated.View
                style={{
                  width: 12,
                  transform: [{rotate: angle}],
                }}>
                <ArrowDown
                  fill={
                    isFocusedRef.current
                      ? color
                        ? color
                        : theme.colors.primary
                      : theme.colors.gray15
                  }
                />
              </Animated.View>
            </View>
          </>
        )}
      />
    );
  };

  const keyExtractor = (item: any, index: any) =>
    `${index}-${valueExtractor!(item)}`;

  const renderItem = ({item, index}: {item: any; index: any}) => {
    if (item == null) {
      return null;
    }
    const {selected} = dropdownState;
    let itemProps = propsExtractor!(item, index);
    itemProps = {
      shadeColor: baseColor,
      ...itemProps,
      onPress: onSelect,
    };
    const itemValue = valueExtractor!(item);
    const itemLabel = labelExtractor!(item);
    const title = itemLabel == null ? itemValue : itemLabel;
    let bgColor = itemBgColor;
    let renderItemColor;
    if (disabled) {
      renderItemColor = disabledItemColor;
    } else if (selected! >= 0) {
      if (index === selected) {
        renderItemColor = selectedItemColor;
        bgColor = theme.colors.gray5;
      } else {
        renderItemColor = itemColor;
      }
    } else {
      renderItemColor = selectedItemColor;
    }
    const itemStyle = {
      backgroundColor: bgColor,
    };
    const textStyle = {color: renderItemColor, fontSize};
    const containerLastBorder =
      index === data!.length - 1 ? {borderBottomWidth: 0} : {};
    return (
      <DropdownItem
        index={index}
        {...itemProps}
        underlayColor={theme.colors.gray5}
        style={[styles.item, itemTextStyle, itemStyle, containerLastBorder]}>
        <Text
          style={[styles.itemText, itemTextStyle, textStyle]}
          numberOfLines={1}>
          {title}
        </Text>
      </DropdownItem>
    );
  };

  const touchableProps = {
    disabled,
    hitSlop,
    pressRetentionOffset,
    onPress,
    testID,
    nativeID,
    accessible,
    accessibilityLabel,
  };
  const allItemCount = data.length;
  const overlayStyle = {opacity: dropdownState.opacity};
  const height = itemSize * getVisibleItemCount();
  const pickerStyle = {
    width: dropdownState.width,
    height: height,
    top: dropdownState.top,
    left: dropdownState.left,
  };

  return (
    <View onLayout={onLayout} style={containerStyle}>
      <TouchableWithoutFeedback {...touchableProps}>
        <View pointerEvents="box-only">{renderBase()}</View>
      </TouchableWithoutFeedback>
      <View ref={listContainerRef} nativeID="listContainer">
        <Modal
          visible={dropdownState.modal}
          transparent
          onRequestClose={onClose}>
          <Animated.View
            style={[styles.overlay, overlayStyle, overlayStyleOverrides]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={onClose}>
            <View
              style={[styles.picker, pickerStyle, pickerStyleOverrides]}
              onStartShouldSetResponder={() => true}>
              <View style={styles.scrollWrapper}>
                <FlatList
                  ref={scrollRef}
                  data={data}
                  style={[styles.scroll]}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  scrollEnabled={getVisibleItemCount() < allItemCount}
                  contentContainerStyle={styles.scrollContainer}
                />
              </View>
            </View>
          </Animated.View>
        </Modal>
      </View>
    </View>
  );
};

Dropdown.defaultProps = {
  name: 'dropdown',
  hitSlop: {
    top: 6,
    right: 4,
    bottom: 6,
    left: 4,
  },
  disabled: false,
  data: [],
  // @ts-ignore
  valueExtractor: ({value} = {}) => value,
  // @ts-ignore
  labelExtractor: ({label} = {}) => label,
  propsExtractor: () => null,
  absoluteRTLLayout: false,
  dropdownOffset: {
    top: 0,
    left: 0,
  },
  dropdownMargins: {
    min: 0,
    max: 0,
  },
  animationDuration: 225,
  fontSize: 16,
  itemCount: 3,
  itemPadding: 10,
  useNativeDriver: false,
  onLayout: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  dropdownPosition: undefined,
};

export default Dropdown;
