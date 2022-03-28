import * as React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import getStyles from './styles';
import {handleMargin, handlePadding} from '../../utils';
import {useTheme} from '../Theme';

export interface IBlockProps extends ViewProps {
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
  shadowType?: 'normal' | 'large';
  color?: string;
  space?: string;
  padding?: number | number[];
  margin?: number | number[];
  animated?: boolean;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  Component?: any;
  children?: React.ReactNode;
}

const Block: React.FC<IBlockProps> = ({
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
  onPress,
  Component = onPress ? TouchableOpacity : View,
  shadowType,
  ...rest
}) => {
  const {theme} = useTheme();
  const styles: any = getStyles(theme, shadowType);

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
      <Animated.View style={blockStyles} {...rest}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Component onPress={onPress} style={blockStyles} {...rest}>
      {children}
    </Component>
  );
};

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
  shadowType: 'normal',
  color: '',
  space: '',
  animated: false,
  wrap: false,
  onPress: undefined,
  style: {},
  margin: 0,
  padding: 0,
  children: null,
};

export default Block;
