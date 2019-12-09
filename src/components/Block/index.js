import React from 'react';
import {View, Animated, TouchableOpacity, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import getStyles from './styles';
import withTheme from '../withTheme';
import {handleMargin, handlePadding} from '../../utils';

class Block extends React.Component {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      color,
      space,
      padding,
      margin,
      animated,
      wrap,
      style,
      children,
      theme,
      onPress,
      // eslint-disable-next-line react/prop-types
      Component = onPress ? TouchableOpacity : View,
      ...props
    } = this.props;
    const styles = getStyles(theme);

    const blockStyles = [
      styles.block,
      flex && {flex},
      flex === false && {flex: 0},
      flex === 0 && {flex: 0},
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      margin && {...handleMargin(margin)},
      padding && {...handlePadding(padding)},
      card && styles.card,
      shadow && styles.shadow,
      space && {justifyContent: `space-${space}`},
      wrap && {flexWrap: 'wrap'},
      color && styles[color],
      color && !styles[color] && {backgroundColor: color},
      style,
    ];

    if (animated) {
      return (
        <Animated.View style={blockStyles} {...props}>
          {children}
        </Animated.View>
      );
    }

    return (
      <Component onPress={onPress} style={blockStyles} {...props}>
        {children}
      </Component>
    );
  }
}

Block.defaultProps = {
  flex: true,
  row: false,
  column: false,
  center: false,
  middle: false,
  left: false,
  right: false,
  top: false,
  bottom: false,
  card: false,
  shadow: false,
  color: '',
  space: '',
  animated: false,
  wrap: false,
  onPress: null,
  style: {},
  margin: 0,
  padding: 0,
  children: null,
};

Block.propTypes = {
  flex: PropTypes.oneOf([true, false, 1, 0]),
  row: PropTypes.bool,
  column: PropTypes.bool,
  center: PropTypes.bool,
  middle: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  card: PropTypes.bool,
  shadow: PropTypes.bool,
  color: PropTypes.string,
  space: PropTypes.string,
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  animated: PropTypes.bool,
  wrap: PropTypes.bool,
  style: ViewPropTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  theme: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func,
};

export default withTheme(Block);
