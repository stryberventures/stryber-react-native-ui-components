import React, {PureComponent} from 'react';
import {
  View,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import withTheme from '../withTheme';
import DropdownItem from '../DropdownItem';
import Ripple from '../Ripple';
import Input from '../Input';
import Text from '../Text';
import {ArrowDown} from '../Icons';
import getStyles from './styles';
interface IDropdownProps extends React.HTMLAttributes<Element> {
  name?: string;
  disabled?: boolean;
  value?: string | number;
  label?: string;
  hitSlop?: {};
  data?: any[];
  valueExtractor?: (...args: any[]) => any;
  labelExtractor?: (...args: any[]) => any;
  propsExtractor?: (...args: any[]) => any;
  absoluteRTLLayout?: boolean;
  dropdownOffset?: {
    top: number;
    left: number;
  };
  dropdownMargins: {
    min: number;
    max: number;
  };
  dropdownPosition?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleInsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  rippleOpacity?: number;
  shadeOpacity?: number;
  rippleDuration?: number;
  animationDuration?: number;
  fontSize?: number;
  textColor?: string;
  itemColor?: string;
  baseColor?: string;
  itemCount?: number;
  itemPadding?: number;
  onLayout?: (...args: any[]) => any;
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
  theme?: any;
  props?: any;
  selectedItemColor?: any;
  disabledItemColor?: any;
  itemTextStyle?: any;
  rippleColor?: any;
}
type DropdownState = {
  opacity?: any;
  selected?: number;
  modal?: boolean;
  value?: any;
  width?: number;
  top?: number;
  left?: number;
  leftInset?: any;
  rightInset?: any;
  bottom?: number;
};
class Dropdown extends PureComponent<IDropdownProps, DropdownState> {
  static defaultProps: any;
  blur: any;
  container: any;
  focus: (event: any) => void;
  focused: any;
  input: any;
  mounted: any;
  ripple: any;
  scroll: any;

  static getDerivedStateFromProps(nextProps: IDropdownProps) {
    return {
      value: nextProps.value,
    };
  }

  constructor(props: IDropdownProps) {
    super(props);
    this.ripple = React.createRef();
    this.container = React.createRef();
    this.scroll = React.createRef();
    this.input = React.createRef();
    this.blur = () => this.onClose();
    this.focus = this.onPress;
    this.mounted = false;
    this.focused = false;
    this.state = {
      opacity: new Animated.Value(0),
      selected: -1,
      modal: false,
      value: this.props.value || '',
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  getValue = () => this.state.value;
  onPress = (event: any) => {
    const {
      data,
      disabled,
      onFocus,
      itemPadding,
      rippleDuration,
      dropdownOffset,
      dropdownMargins: {min: minMargin, max: maxMargin},
      animationDuration,
      useNativeDriver,
    } = this.props;
    if (disabled) {
      return;
    }
    const itemCount = data!.length;
    const timestamp = Date.now();
    if (event != null) {
      /* Adjust event location */
      const eventLocation = {
        locationY: event.nativeEvent.locationY - this.rippleInsets().top,
        locationX: event.nativeEvent.locationX - this.rippleInsets().left,
      };
      /* Start ripple directly from event */
      this.ripple.current.startRipple(eventLocation);
    }
    if (!itemCount) {
      return;
    }
    this.focused = true;
    if (typeof onFocus === 'function') {
      onFocus();
    }
    const dimensions = Dimensions.get('window');
    this.container.current.measureInWindow(
      (
        x: number,
        y: number,
        containerWidth: number,
        containerHeight: number,
      ) => {
        const {opacity} = this.state;
        const delay = Math.max(
          0,
          rippleDuration! - animationDuration! - (Date.now() - timestamp),
        );
        const selected = this.selectedIndex();
        let leftInset;
        let left = x + dropdownOffset!.left - maxMargin;
        if (left > minMargin) {
          leftInset = maxMargin;
        } else {
          left = minMargin;
          leftInset = minMargin;
        }
        let right = x + containerWidth + maxMargin;
        let rightInset;
        if (dimensions.width - right > minMargin) {
          rightInset = maxMargin;
        } else {
          right = dimensions.width - minMargin;
          rightInset = minMargin;
        }
        const visibleItemCount = this.visibleItemCount();
        const itemSize = this.itemSize();
        const height = 2 * itemPadding! + itemSize * visibleItemCount;
        const top = y + dropdownOffset!.top - itemPadding!;
        const bottomEdge =
          dimensions.height < top + height
            ? dimensions.height + dropdownOffset!.top - (top + containerHeight)
            : 0;
        this.setState({
          modal: true,
          width: right - left,
          top: bottomEdge ? undefined : top,
          left,
          leftInset,
          rightInset,
          selected,
          bottom: bottomEdge ? bottomEdge : undefined,
        });
        setTimeout(() => {
          if (this.mounted) {
            this.resetScrollOffset();
            Animated.timing(opacity, {
              duration: animationDuration,
              toValue: 1,
              useNativeDriver,
            }).start(() => {
              if (this.mounted && Platform.OS === 'ios') {
                const {flashScrollIndicators} = this.scroll || {};
                if (typeof flashScrollIndicators === 'function') {
                  flashScrollIndicators.call(this.scroll);
                }
              }
            });
          }
        }, delay);
      },
    );
  };
  onClose = (value = this.state.value) => {
    const {onBlur, animationDuration, useNativeDriver} = this.props;
    const {opacity} = this.state;
    Animated.timing(opacity, {
      duration: animationDuration,
      toValue: 0,
      useNativeDriver,
    }).start(() => {
      this.focused = false;
      if (typeof onBlur === 'function') {
        onBlur();
      }
      if (this.mounted) {
        this.setState({value, modal: false});
      }
    });
  };
  onSelect = (index: any) => {
    const {
      data,
      valueExtractor,
      onChange,
      animationDuration,
      rippleDuration,
      name,
    } = this.props;
    const value = valueExtractor!(data![index]);
    const delay = Math.max(0, rippleDuration! - animationDuration!);
    if (typeof onChange === 'function') {
      onChange(value, name, index);
    }
    setTimeout(() => this.onClose(value), delay);
  };
  onLayout = (event: any) => {
    const {onLayout} = this.props;
    if (typeof onLayout === 'function') {
      onLayout(event);
    }
  };
  selectedIndex() {
    const {value} = this.state;
    const {data, valueExtractor} = this.props;
    return data!.findIndex(
      item => item != null && value === valueExtractor!(item),
    );
  }
  selectedItem() {
    const {data} = this.props;
    return data![this.selectedIndex()];
  }
  isFocused() {
    return this.focused;
  }
  itemSize() {
    const {fontSize, itemPadding} = this.props;
    return Math.ceil(fontSize! * 1.5 + itemPadding! * 2);
  }
  visibleItemCount() {
    const {data, itemCount} = this.props;
    return Math.min(data!.length, itemCount!);
  }
  tailItemCount() {
    return Math.max(this.visibleItemCount() - 2, 0);
  }
  rippleInsets() {
    const {top = 16, right = 0, bottom = -8, left = 0} =
      this.props.rippleInsets || {};
    return {
      top,
      right,
      bottom,
      left,
    };
  }
  resetScrollOffset() {
    const {selected} = this.state;
    const {data, dropdownPosition} = this.props;
    let offset = 0;
    const itemCount = data!.length;
    const itemSize = this.itemSize();
    const tailItemCount = this.tailItemCount();
    const visibleItemCount = this.visibleItemCount();
    if (itemCount > visibleItemCount) {
      if (dropdownPosition == null) {
        switch (selected) {
          case -1:
            break;
          case 0:
          case 1:
            break;
          default:
            if (selected! >= itemCount - tailItemCount) {
              offset = itemSize * (itemCount - visibleItemCount);
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
        index = Math.min(index, itemCount - visibleItemCount);
        if (selected! >= 0) {
          offset = itemSize * index;
        }
      }
    }
    if (this.scroll) {
      this.scroll.current.scrollToOffset({offset, animated: false});
    }
  }
  keyExtractor = (item: any, index: any) => {
    const {valueExtractor} = this.props;
    return `${index}-${valueExtractor!(item)}`;
  };
  checkValueLength = (value: any) => {
    if (value.length > 45) {
      return `${value.slice(0, 42)}...`;
    }
    return value;
  };
  renderBase(props: any) {
    const {value} = this.state;
    const {data, labelExtractor, label, theme} = this.props;
    const index = this.selectedIndex();
    let title;
    if (index >= 0) {
      title = labelExtractor!(data![index]);
    }
    if (title == null) {
      title = value;
    }
    title = title == null || typeof title === 'string' ? title : String(title);
    return (
      <Input
        {...props}
        value=""
        label=""
        placeholderLabel={this.checkValueLength(title) || label}
        ref={this.input}
        placeholderTextColor={title ? theme.colors.darkGrey : theme.colors.gray}
        rightLabel={() => <ArrowDown />}
      />
    );
  }
  renderRipple() {
    const {
      theme,
      baseColor = theme.colors.gray,
      rippleColor = baseColor,
      rippleOpacity,
      rippleDuration,
      rippleCentered,
      rippleSequential,
    } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {bottom, ...insets} = this.rippleInsets();
    const style = {
      ...insets,
      height: theme.sizes.inputHeight,
      position: 'absolute',
    };
    return (
      <Ripple
        style={style}
        rippleColor={rippleColor}
        rippleDuration={rippleDuration}
        rippleOpacity={rippleOpacity}
        rippleCentered={rippleCentered}
        rippleSequential={rippleSequential}
        ref={this.ripple}
      />
    );
  }
  renderItem = ({item, index}: {item: any; index: any}) => {
    if (item == null) {
      return null;
    }
    const {selected, leftInset, rightInset} = this.state;
    const {
      valueExtractor,
      labelExtractor,
      propsExtractor,
      theme,
      textColor = theme.colors.darkGrey,
      itemColor = theme.colors.gray2,
      baseColor = theme.colors.gray,
      selectedItemColor = textColor,
      disabledItemColor = baseColor,
      fontSize,
      itemTextStyle,
      rippleOpacity,
      rippleDuration,
      shadeOpacity,
    } = this.props;
    const styles: any = getStyles(theme);
    let props = propsExtractor!(item, index);
    props = {
      rippleDuration,
      rippleOpacity,
      rippleColor: baseColor,
      shadeColor: baseColor,
      shadeOpacity,
      ...props,
      onPress: this.onSelect,
    };
    const {style, disabled} = props;
    const value = valueExtractor!(item);
    const label = labelExtractor!(item);
    const title = label == null ? value : label;
    let color;
    if (disabled) {
      color = disabledItemColor;
    } else if (selected! >= 0) {
      if (index === selected) {
        color = selectedItemColor;
      } else {
        color = itemColor;
      }
    } else {
      color = selectedItemColor;
    }
    const textStyle = {color, fontSize};
    props.style = [
      style,
      {
        height: this.itemSize(),
        paddingLeft: leftInset,
        paddingRight: rightInset,
      },
    ];
    const containerLastBorder =
      index === this!.props!.data!.length - 1 ? {borderBottomWidth: 0} : {};
    return (
      <DropdownItem
        index={index}
        {...props}
        style={[styles.item, itemTextStyle, containerLastBorder]}>
        <Text style={[styles.item, itemTextStyle, textStyle]} numberOfLines={1}>
          {title}
        </Text>
      </DropdownItem>
    );
  };
  render() {
    const {
      containerStyle,
      overlayStyle: overlayStyleOverrides,
      pickerStyle: pickerStyleOverrides,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rippleInsets,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rippleOpacity,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rippleCentered,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rippleSequential,
      hitSlop,
      pressRetentionOffset,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
      theme,
      ...props
    } = this.props;
    const styles = getStyles(theme);
    const {data, disabled, itemPadding} = props;
    const {left, top, width, opacity, modal, bottom} = this.state;
    const itemCount = data!.length;
    const visibleItemCount = this.visibleItemCount();
    const itemSize = this.itemSize();
    const height = 2 * itemPadding! + itemSize * visibleItemCount;
    const translateY = -itemPadding!;
    const overlayStyle = {opacity};
    const pickerStyle = {
      width,
      height,
      top,
      left,
      bottom,
      transform: [{translateY}],
    };
    const touchableProps = {
      disabled,
      hitSlop,
      pressRetentionOffset,
      onPress: this.onPress,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
    };
    return (
      <View
        onLayout={this.onLayout}
        ref={this.container}
        style={containerStyle}>
        <TouchableWithoutFeedback {...touchableProps}>
          <View pointerEvents="box-only">
            {this.renderBase(props)}
            {this.renderRipple()}
          </View>
        </TouchableWithoutFeedback>

        <Modal visible={modal} transparent onRequestClose={this.blur}>
          <Animated.View
            style={[styles.overlay, overlayStyle, overlayStyleOverrides]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={this.blur}>
            <View
              style={[styles.picker, pickerStyle, pickerStyleOverrides]}
              onStartShouldSetResponder={() => true}>
              <FlatList
                ref={this.scroll}
                data={data}
                style={[styles.scroll]}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                scrollEnabled={visibleItemCount < itemCount}
                contentContainerStyle={styles.scrollContainer}
              />
            </View>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}
export default withTheme(Dropdown);
Dropdown.defaultProps = {
  name: 'dropdown',
  value: '',
  label: 'Choose option...',
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
    top: 32,
    left: 0,
  },
  dropdownMargins: {
    min: 0,
    max: 0,
  },
  rippleCentered: false,
  rippleSequential: true,
  rippleInsets: {
    top: 16,
    right: 0,
    bottom: -8,
    left: 0,
  },
  rippleOpacity: 0.54,
  shadeOpacity: 0.12,
  rippleDuration: 400,
  animationDuration: 225,
  fontSize: 16,
  itemCount: 4,
  itemPadding: 8,
  useNativeDriver: false,
  onLayout: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  dropdownPosition: null,
};