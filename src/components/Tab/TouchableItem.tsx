import * as React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  ViewPropTypes,
} from 'react-native';
import {tabView} from '../../constants';
import withTheme from '../withTheme';
const {LOLLIPOP} = tabView;
interface ITouchableItemProps extends React.HTMLAttributes<Element> {
  style?: any;
  pressOpacity?: number;
  theme: {};
  pressColor?: string;
  borderless?: boolean;
  rest?: any;
}
class TouchableItem extends React.Component<ITouchableItemProps, {}> {
  render() {
    const {
      style,
      pressOpacity,
      theme,
      pressColor = theme.colors.gray,
      borderless,
      children,
      ...rest
    } = this.props;
    if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...rest}
          background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
          <View style={style}>{React.Children.only(children)}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...rest} style={style} activeOpacity={pressOpacity}>
          {children}
        </TouchableOpacity>
      );
    }
  }
}
export default withTheme(TouchableItem);
