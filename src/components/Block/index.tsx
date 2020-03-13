import * as React from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import getStyles from './styles';
import withTheme from '../withTheme';
import {handleMargin, handlePadding} from '../other/utils';
interface IBlockProps extends React.HTMLAttributes<Element> {
  flex?: 1 | 0;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  card?: boolean;
  shadow?: boolean;
  color?: string;
  space?: string;
  padding?: number | number[];
  margin?: number | number[];
  animated?: boolean;
  wrap?: boolean;
  style?: any;
  theme: {};
  onPress?: (...args: any[]) => any;
  Component?: any;
  props?: any;
}
class Block extends React.Component<IBlockProps, {}> {
  static defaultProps: any;
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
  flex: 1,
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
export default withTheme(Block);
