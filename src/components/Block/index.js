import React from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';

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
      <Component style={blockStyles} {...props}>
        {children}
      </Component>
    );
  }
}

export default withTheme(Block);
