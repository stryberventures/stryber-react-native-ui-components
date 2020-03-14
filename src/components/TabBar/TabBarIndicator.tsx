import * as React from 'react';
import {I18nManager} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import withTheme from '../withTheme';
import {memoize} from '../other/utils';
import styles from './styles';
const {interpolate, multiply, Extrapolate} = Animated;
interface ITabBarIndicatorProps {
  position?: {};
  navigationState: {};
  getTabWidth?: (...args: any[]) => any;
  width?: string;
  style?: any;
  layout?: {};
  theme?: any;
}
class TabBarIndicator extends React.Component<ITabBarIndicatorProps, {}> {
  componentDidMount() {
    this.fadeInIndicator();
  }
  componentDidUpdate() {
    this.fadeInIndicator();
  }
  fadeInIndicator = () => {
    const {navigationState, layout, width, getTabWidth} = this.props;
    if (
      !this.isIndicatorShown &&
      width === 'auto' &&
      layout.width &&
      // We should fade-in the indicator when we have widths for all the tab items
      navigationState.routes.every((_, i) => getTabWidth(i))
    ) {
      this.isIndicatorShown = true;
      Animated.timing(this.opacity, {
        duration: 150,
        toValue: 1,
        easing: Easing.in(Easing.linear),
      }).start();
    }
  };
  isIndicatorShown = false;
  opacity = new Animated.Value(this.props.width === 'auto' ? 0 : 1);
  getTranslateX = memoize((position, routes, getTabWidth) => {
    const inputRange = routes.map((_, i) => i);
    // every index contains widths at all previous indices
    const outputRange = routes.reduce((acc, _, i) => {
      if (i === 0) return [0];
      return [...acc, acc[i - 1] + getTabWidth(i - 1)];
    }, []);
    const translateX = interpolate(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
    return multiply(translateX, I18nManager.isRTL ? -1 : 1);
  });
  getWidth = memoize((position, routes, getTabWidth) => {
    const inputRange = routes.map((_, i) => i);
    const outputRange = inputRange.map(getTabWidth);
    return interpolate(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
  });
  render() {
    const {
      position,
      navigationState,
      getTabWidth,
      width,
      style,
      layout,
      theme,
    } = this.props;
    const {routes} = navigationState;
    const translateX =
      routes.length > 1 ? this.getTranslateX(position, routes, getTabWidth) : 0;
    const indicatorWidth =
      width === 'auto'
        ? routes.length > 1
          ? this.getWidth(position, routes, getTabWidth)
          : getTabWidth(0)
        : width;
    return (
      <Animated.View
        style={[
          styles.indicator,
          {backgroundColor: theme.colors.primary},
          // If layout is not available, use `left` property for positioning the indicator
          // This avoids rendering delay until we are able to calculate translateX
          {width: indicatorWidth},
          layout.width
            ? {transform: [{translateX}]}
            : {left: `${(100 / routes.length) * navigationState.index}%`},
          width === 'auto' ? {opacity: this.opacity} : null,
          style,
        ]}
      />
    );
  }
}
export default withTheme(TabBarIndicator);
