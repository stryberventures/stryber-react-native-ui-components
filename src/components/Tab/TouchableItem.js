import * as React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

import {tabView} from '../../constants';
import withTheme from '../withTheme';

const {LOLLIPOP} = tabView;

class TouchableItem extends React.Component {
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

TouchableItem.propTypes = {
  style: ViewPropTypes.style,
  pressOpacity: PropTypes.number,
  theme: PropTypes.shape({}).isRequired,
  pressColor: PropTypes.string,
  borderless: PropTypes.bool,
  children: PropTypes.shape({}),
};

export default withTheme(TouchableItem);
