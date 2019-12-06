import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import Block from '../Block';
import withTheme from '../withTheme';
import getStyles from './styles';

class Checkbox extends Component {
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
    return <Block style={styles.radioIcon} flex={false} />;
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
          (this.state.checked && (
            <Icon
              {...this.props}
              name="md-checkmark"
              size={theme.sizes.checkboxIcon}
              color="white"
            />
          ))}
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
        onPress={this.spring.bind(this, Easing.bounce)}>
        {this.renderCheckIcon()}
        <Block style={styles.textContainer}>
          <Text style={styles.textStyle}>{text}</Text>
        </Block>
      </TouchableOpacity>
    );
  }
}

Checkbox.defaultProps = {
  fontSize: 16,
  value: false,
  text: '❤️ Stryber',
  textColor: '#757575',
  name: 'checkbox',
  onPress: () => {},
  opacity: 0.8,
  radio: false,
};

Checkbox.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  value: PropTypes.bool,
  name: PropTypes.string,
  opacity: PropTypes.number,
  theme: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func,
  radio: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  iconComponent: PropTypes.node,
};

export default withTheme(Checkbox);
