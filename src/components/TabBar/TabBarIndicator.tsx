import * as React from 'react';
import {I18nManager, View} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';
import withTheme from '../withTheme';
import {memoize} from '../../utils';
import styles from './styles';
const {interpolateNode, multiply, Extrapolate} = Animated;
interface ITabBarIndicatorProps {
  position?: {};
  navigationState: any;
  getTabWidth?: (...args: any[]) => any;
  width?: string;
  style?: any;
  layout?: any;
  theme?: any;
  contentContainerOffset?: number;
}
class TabBarIndicator extends React.Component<ITabBarIndicatorProps, {}> {
  static defaultProps = {
    contentContainerOffset: 0,
  };
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
      layout!.width &&
      // We should fade-in the indicator when we have widths for all the tab items
      navigationState.routes.every((_: any, i: number) => getTabWidth!(i))
    ) {
      this.isIndicatorShown = true;
      Animated.timing(this.opacity, {
        duration: 150,
        toValue: 1,
        easing: EasingNode.in(EasingNode.linear),
      }).start();
    }
  };
  isIndicatorShown = false;
  opacity = new Animated.Value(this.props.width === 'auto' ? 0 : 1);
  getTranslateX = memoize((position: any, routes: any, getTabWidth: any) => {
    const inputRange = routes.map((_: any, i: number) => i);
    // every index contains widths at all previous indices
    const outputRange = routes.reduce((acc: any, _: any, i: any) => {
      if (i === 0) return [0];
      return [...acc, acc[i - 1] + getTabWidth(i - 1)];
    }, []);
    const translateX = interpolateNode(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
    return multiply(translateX, I18nManager.isRTL ? -1 : 1);
  });
  getWidth = memoize((position: any, routes: any, getTabWidth: any) => {
    const inputRange = routes.map((_: any, i: any) => i);
    const outputRange = inputRange.map(getTabWidth);
    return interpolateNode(position, {
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
      contentContainerOffset,
    } = this.props;
    const {routes} = navigationState;
    const translateX =
      routes.length > 1 ? this.getTranslateX(position, routes, getTabWidth) : 0;
    const indicatorWidth =
      width === 'auto'
        ? routes.length > 1
          ? this.getWidth(position, routes, getTabWidth)
          : getTabWidth!(0)
        : width;
    return (
      <>
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
            {
              left: contentContainerOffset,
              right: contentContainerOffset,
            },
          ]}
        />
        <View
          style={[
            styles.indicatorBottomLine,
            {
              left: contentContainerOffset,
              right: contentContainerOffset,
            },
          ]}
        />
      </>
    );
  }
}
export default withTheme(TabBarIndicator);
