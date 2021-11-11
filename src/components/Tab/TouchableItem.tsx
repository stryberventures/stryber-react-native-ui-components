import * as React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  TouchableNativeFeedbackProps,
} from 'react-native';
import {tabView} from '../other/constants';
import withTheme from '../withTheme';
const {LOLLIPOP} = tabView;
interface ITouchableItemProps extends TouchableNativeFeedbackProps {
  style?: any;
  pressOpacity?: number;
  theme?: any;
  pressColor?: string;
  borderless?: boolean;
  rest?: any;
}
const TouchableItem: React.FC<ITouchableItemProps> = ({
  style,
  pressOpacity,
  theme,
  pressColor = theme.colors.gray,
  borderless,
  children,
  ...rest
}) => {
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
};
export default withTheme(TouchableItem);
