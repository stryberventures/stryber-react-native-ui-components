import React, {Component} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {Check} from '../Icons';
import Text from '../Text';
import Block from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';
export interface ICheckboxProps {
  tickColor?: string;
  text?: string | React.ReactElement;
  value?: boolean;
  name?: string;
  opacity?: number;
  theme?: any;
  onPress?: (...args: any[]) => any;
  radio?: boolean;
  iconComponent?: any;
  shouldCheckboxChange?: boolean;
  style?: any;
  error?: string | boolean;
  disabled?: boolean;
  size?: 'regular' | 'large';
  bgColor?: string;
  textClickable?: boolean;
  testID?: any;
}
export type CheckboxState = {
  checked?: any;
  springValue?: any;
};
class Checkbox extends Component<ICheckboxProps, CheckboxState> {
  static defaultProps: any;
  constructor(props: ICheckboxProps) {
    super(props);
    this.state = {
      checked: this.props.value || false,
      springValue: new Animated.Value(1),
    };
  }
  getValue = () => this.state.checked;
  setChecked = () => {
    const {onPress, name} = this.props;
    this.setState(
      prevState => ({checked: !prevState.checked}),
      () => {
        onPress!(this.state.checked, name);
      },
    );
  };
  spring = () => {
    this.setChecked();
    const {springValue} = this.state;
    springValue.setValue(0.7);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  renderRadioIcon = () => {
    const {theme, radio, error, disabled, size, bgColor, tickColor} =
      this.props;
    const styles = getStyles({
      theme,
      radio,
      error: !!error,
      disabled,
      size,
      bgColor,
      tickColor,
    });
    return <Block style={styles.radioIcon} flex={0} />;
  };
  onPress = () => {
    this.props.shouldCheckboxChange && this.spring();
  };
  renderControl = () => {
    const {checked, springValue} = this.state;
    const {
      iconComponent,
      theme,
      radio,
      error,
      disabled,
      size,
      bgColor,
      tickColor,
      textClickable,
      testID,
    } = this.props;
    const checkboxSizes =
      // @ts-ignore
      theme.sizes.checkbox[size] || theme.sizes.checkbox.regular;
    const styles = getStyles({
      theme,
      checked,
      radio,
      error: !!error,
      disabled,
      size,
      bgColor,
    });

    return (
      <TouchableOpacity
        testID={testID}
        disabled={textClickable}
        onPress={this.onPress}>
        <Animated.View
          style={[styles.checkbox, {transform: [{scale: springValue}]}]}>
          {(this.state.checked && iconComponent) ||
            (this.state.checked && radio && this.renderRadioIcon()) ||
            (this.state.checked && (
              <Check
                width={checkboxSizes.check}
                height={checkboxSizes.check}
                fill={tickColor || theme.colors.white}
              />
            ))}
        </Animated.View>
      </TouchableOpacity>
    );
  };
  render() {
    const {checked} = this.state;
    const {
      text,
      opacity,
      theme,
      radio,
      error,
      disabled,
      size,
      bgColor,
      style,
      textClickable,
    } = this.props;
    const styles = getStyles({
      theme,
      radio,
      error: !!error,
      disabled,
      checked,
      size,
      bgColor,
    });
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.container, style]}
          activeOpacity={opacity}
          disabled={!textClickable || disabled}
          onPress={this.onPress}>
          {this.renderControl()}
          <Block style={styles.textContainer}>
            <Text
              style={[
                styles.textStyle,
                disabled ? styles.textStyleDisabled : {},
                error ? styles.textStyleError : {},
              ]}>
              {text}
            </Text>
          </Block>
        </TouchableOpacity>
        {!!this.props.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
        )}
      </View>
    );
  }
}
Checkbox.defaultProps = {
  value: false,
  text: '❤️ Stryber',
  name: 'checkbox',
  onPress: () => {},
  opacity: 0.8,
  radio: false,
  shouldCheckboxChange: true,
  size: 'regular',
  textClickable: true,
};
export default withTheme(Checkbox);
