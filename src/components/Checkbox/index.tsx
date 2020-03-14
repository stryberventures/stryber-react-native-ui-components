import React, {Component} from 'react';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import {Check} from '../Icons';
import Text from '../Text';
import Block from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';
interface ICheckboxProps {
  text?: string;
  textColor?: string;
  value?: boolean;
  name?: string;
  opacity?: number;
  theme?: any;
  onPress?: (...args: any[]) => any;
  radio?: boolean;
  iconComponent?: any;
  shouldCheckboxChange?: boolean;
}
type CheckboxState = {
  checked?: any;
  springValue?: any;
};
class Checkbox extends Component<ICheckboxProps, CheckboxState> {
  static defaultProps: any;
  constructor(props) {
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
        onPress(this.state.checked, name);
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
    }).start();
  };
  renderRadioIcon = () => {
    const styles = getStyles(this.props.theme);
    return <Block style={styles.radioIcon} flex={0} />;
  };
  renderCheckIcon = () => {
    const {checked, springValue} = this.state;
    const {iconComponent, theme, radio} = this.props;
    const styles = getStyles(theme, checked, radio);
    return (
      <Animated.View
        style={[styles.checkbox, {transform: [{scale: springValue}]}]}>
        {(this.state.checked && iconComponent) ||
          (this.state.checked && radio && this.renderRadioIcon()) ||
          (this.state.checked && <Check />)}
      </Animated.View>
    );
  };
  render() {
    const {text, opacity, theme} = this.props;
    const styles = getStyles(theme, this.state.checked);
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={opacity}
        onPress={
          this.props.shouldCheckboxChange
            ? this.spring.bind(this, Easing.bounce)
            : null
        }>
        {this.renderCheckIcon()}
        <Block style={styles.textContainer}>
          <Text style={styles.textStyle}>{text}</Text>
        </Block>
      </TouchableOpacity>
    );
  }
}
Checkbox.defaultProps = {
  value: false,
  text: '❤️ Stryber',
  textColor: '#757575',
  name: 'checkbox',
  onPress: () => {},
  opacity: 0.8,
  radio: false,
  shouldCheckboxChange: true,
};
export default withTheme(Checkbox);
