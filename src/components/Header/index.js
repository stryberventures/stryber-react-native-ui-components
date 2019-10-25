import React, {Component} from 'react';

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
      animated,
    } = this.props;
    const styles = getStyles(theme);
    return (
      <Block animated={animated} flex={0} style={[styles.header, style]}>
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

export default withTheme(Header);
