import React, {Component} from 'react';
import {ViewPropTypes, Text as Typography} from 'react-native';
import Text from '../Text';
import withTheme from '../withTheme';
import getStyles from './styles';
import Block from '../Block';
interface IBadgeProps extends React.HTMLAttributes<Element> {
  theme: {};
  value?: string | number;
  textStyle?: any;
  style?: any;
  onPress?: (...args: any[]) => any;
  color?: string;
}
class Badge extends Component<IBadgeProps, {}> {
  static defaultProps: any;
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
export default withTheme(Badge);
