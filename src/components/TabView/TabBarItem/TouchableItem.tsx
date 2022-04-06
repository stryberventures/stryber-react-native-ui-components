import * as React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  ViewProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {tabView} from '../../../constants';
import {useTheme} from '../../Theme';

const {LOLLIPOP} = tabView;

interface ITouchableItemProps extends ViewProps {
  onPress: () => void;
  onLongPress?: () => void;
  delayPressIn?: number;
  borderless?: boolean;
  pressColor: string;
  pressOpacity?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const TouchableItem: React.FC<ITouchableItemProps> = ({
  style,
  pressOpacity,
  pressColor,
  borderless,
  children,
  ...rest
}) => {
  const {theme} = useTheme();
  if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        {...rest}
        background={TouchableNativeFeedback.Ripple(
          pressColor || theme.colors.gray,
          borderless,
        )}>
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

export default TouchableItem;
