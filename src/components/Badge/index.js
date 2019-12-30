import React, {Component} from 'react';
import {ViewPropTypes, Text as Typography} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import withTheme from '../withTheme';
import getStyles from './styles';
import Block from '../Block';

class Badge extends Component {
  render() {
    const {theme, value, textStyle, style, onPress, color} = this.props;
    const styles = getStyles(theme);
    const badgeStyles = [
      color && styles[color],
      color && !styles[color] && {backgroundColor: color},
      style,
    ];
    return (
      <Block
        center
        middle
        card
        onPress={onPress}
        style={[styles.badge, ...badgeStyles]}>
        <Text size={theme.sizes.caption - 2} white style={textStyle}>
          {value}
        </Text>
      </Block>
    );
  }
}

Badge.defaultProps = {
  value: '',
  textStyle: {},
  style: {},
  color: '',
};

Badge.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textStyle: Typography.propTypes.style,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

export default withTheme(Badge);
