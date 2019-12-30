import React, {Component} from 'react';
import {Text as Typography, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import withTheme from '../withTheme';
import Block from '../Block';
import Text from '../Text';

import getStyles from './styles';

class Header extends Component {
  render() {
    const {
      leftIcon,
      text,
      textStyle,
      style,
      theme,
      rightIcon,
      ...props
    } = this.props;
    const styles = getStyles(theme);
    return (
      <Block flex={0} style={[styles.header, style]} {...props}>
        {leftIcon()}
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.headerText, textStyle]}>
          {text}
        </Text>
        {rightIcon()}
      </Block>
    );
  }
}

Header.defaultProps = {
  style: {},
  textStyle: {},
  leftIcon: () => {},
  rightIcon: () => {},
  text: '',
};

Header.propTypes = {
  leftIcon: PropTypes.func,
  text: PropTypes.string,
  textStyle: Typography.propTypes.style,
  style: ViewPropTypes.style,
  theme: PropTypes.shape({}).isRequired,
  rightIcon: PropTypes.func,
};

export default withTheme(Header);
