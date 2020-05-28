import React, {PureComponent} from 'react';
import withTheme from '../withTheme';
import Button from '../Button';
import getStyles from './styles';
interface IDropdownItemProps extends React.HTMLAttributes<Element> {
  index: number;
  style?: any;
  theme?: any;
  props?: any;
  onPress?: any;
}
class DropdownItem extends PureComponent<IDropdownItemProps, {}> {
  static defaultProps: any;
  constructor(props: IDropdownItemProps) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    let {onPress, index} = this.props;
    if (typeof onPress === 'function') {
      onPress(index);
    }
  }
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {children, style, theme, index, ...props} = this.props;
    const styles = getStyles();
    return (
      // @ts-ignore
      <Button
        {...props}
        style={[styles.container, style]}
        ripple
        onPress={this.onPress}>
        {children}
      </Button>
    );
  }
}
DropdownItem.defaultProps = {
  rippleContainerBorderRadius: 0,
  shadeBorderRadius: 0,
};
export default withTheme(DropdownItem);
