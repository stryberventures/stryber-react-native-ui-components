import * as React from 'react';
import {I18nManager, View} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';
import {memoize} from '../../../utils';
import styles from './styles';
import {NavigationState, Route, SceneRendererProps} from '../types';
import {useEffect, useRef, useState} from 'react';
import {useTheme} from '../../Theme';
const {interpolateNode, multiply, Extrapolate} = Animated;

export type GetTabWidth = (index: number) => number;

export interface ITabBarIndicatorProps<T extends Route>
  extends SceneRendererProps {
  navigationState: NavigationState<T>;
  width: string | number;
  style?: any;
  getTabWidth: GetTabWidth;
  contentContainerOffset?: number;
}

const getTranslateX = memoize(
  (
    position: Animated.Node<number>,
    routes: Route[],
    getTabWidth: GetTabWidth,
  ) => {
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
  },
);

const getWidth = memoize(
  (
    position: Animated.Node<number>,
    routes: Route[],
    getTabWidth: GetTabWidth,
  ) => {
    const inputRange = routes.map((_: any, i: any) => i);
    const outputRange = inputRange.map(getTabWidth);
    return interpolateNode(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
  },
);

const TabBarIndicator = <T extends Route>({
  navigationState,
  layout,
  width,
  getTabWidth,
  position,
  style,
  contentContainerOffset,
}: ITabBarIndicatorProps<T>) => {
  const {theme} = useTheme();
  const [isIndicatorShown, setIsIndicatorShown] = useState(false);
  const opacity = useRef(new Animated.Value(width === 'auto' ? 0 : 1)).current;

  const {routes} = navigationState;
  const translateX =
    routes.length > 1 ? getTranslateX(position, routes, getTabWidth) : 0;
  const indicatorWidth =
    width === 'auto'
      ? routes.length > 1
        ? getWidth(position, routes, getTabWidth)
        : getTabWidth!(0)
      : width;

  const fadeInIndicator = () => {
    if (
      !isIndicatorShown &&
      width === 'auto' &&
      layout!.width &&
      // We should fade-in the indicator when we have widths for all the tab items
      navigationState.routes.every((_, i) => getTabWidth!(i))
    ) {
      setIsIndicatorShown(true);
      Animated.timing(opacity, {
        duration: 150,
        toValue: 1,
        easing: EasingNode.in(EasingNode.linear),
      }).start();
    }
  };

  useEffect(() => {
    fadeInIndicator();
  });

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
          width === 'auto' ? {opacity} : null,
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
};

export default TabBarIndicator;
