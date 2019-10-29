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
      checked: this.props.isChecked || false,
      springValue: new Animated.Value(1),
    };
  }

  setChecked = () => {
    const {checked} = this.state;
    this.setState({checked: !checked});
  };

  spring = () => {
    this.setChecked();
    const {springValue} = this.state;
    const {onPress} = this.props;
    springValue.setValue(0.7);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 3,
    }).start();
    if (onPress) {
      onPress();
    }
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
        activeOpacity={opacity || 0.8}
        onPress={this.spring.bind(this, Easing.bounce)}>
        {this.renderCheckIcon()}
        <Block style={styles.textContainer}>
          <Text style={styles.textStyle}>{text}</Text>
        </Block>
      </TouchableOpacity>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
  isChecked: PropTypes.bool,
};

Checkbox.defaultProps = {
  fontSize: 16,
  isChecked: false,
  text: '❤️ Stryber',
  textColor: '#757575',
};

export default withTheme(Checkbox);
