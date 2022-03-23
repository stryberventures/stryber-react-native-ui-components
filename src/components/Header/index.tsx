import React, {Component} from 'react';
import withTheme from '../withTheme';
import Block from '../Block';
import Text from '../Text';
import getStyles from './styles';
interface IHeaderProps {
  leftIcon?: (...args: any[]) => any;
  text?: string;
  textStyle?: any;
  style?: any;
  theme?: any;
  rightIcon?: (...args: any[]) => any;
  props?: any;
}
class Header extends Component<IHeaderProps, {}> {
  static defaultProps: any;
  render() {
    const {leftIcon, text, textStyle, style, theme, rightIcon, ...props} =
      this.props;
    const styles = getStyles(theme);
    return (
      // @ts-ignore
      <Block flex={0} style={[styles.header, style]} {...props}>
        {leftIcon!()}
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.headerText, textStyle]}>
          {text}
        </Text>
        {rightIcon!()}
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
