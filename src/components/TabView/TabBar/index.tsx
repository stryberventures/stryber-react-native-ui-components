import * as React from 'react';
import {
  StyleSheet,
  View,
  I18nManager,
  Platform,
  TextStyle,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import TabBarItem from '../TabBarItem';
import TabBarIndicator, {ITabBarIndicatorProps} from './TabBarIndicator';
import {memoize} from '../../../utils';
import styles from './styles';
import {
  Layout,
  NavigationState,
  Route,
  Scene,
  SceneRendererProps,
} from '../types';

export interface ITabBarProps<T extends Route> extends SceneRendererProps {
  navigationState: NavigationState<T>;
  scrollEnabled?: boolean;
  bounces?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  getLabelText: (scene: Scene<T>) => string | undefined;
  getAccessible: (scene: Scene<T>) => boolean | undefined;
  getAccessibilityLabel: (scene: Scene<T>) => string | undefined;
  getTestID: (scene: Scene<T>) => string | undefined;
  renderLabel?: (
    scene: Scene<T> & {
      focused: boolean;
      color?: string;
    },
  ) => React.ReactNode;
  renderIcon?: (
    scene: Scene<T> & {
      focused: boolean;
      color?: string;
    },
  ) => React.ReactNode;
  renderBadge?: (scene: Scene<T>) => React.ReactNode;
  renderIndicator: (props: ITabBarIndicatorProps<T>) => React.ReactNode;
  renderTabBarItem?: (
    props: ITabBarProps<T> & {key: string},
  ) => React.ReactElement;
  onTabPress?: (scene: Scene<T> & Event) => void;
  onTabLongPress?: (scene: Scene<T>) => void;
  tabStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  activeLabelStyle?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
  contentContainerOffset?: number;
  segmentView?: boolean;
  segmentLineColor?: string;
  activeTabBackground?: string;
}

type TabBarState = {
  layout: Layout;
  tabWidths?: {[key: string]: number};
};

export default class TabBar<T extends Route> extends React.Component<
  ITabBarProps<T>,
  TabBarState
> {
  static defaultProps: any;
  state = {
    layout: {width: 0, height: 0},
    tabWidths: {},
  };
  componentDidUpdate(
    prevProps: ITabBarProps<T>,
    prevState: TabBarState,
    _: any,
  ) {
    const {navigationState} = this.props;
    const {layout, tabWidths} = this.state;
    if (
      prevProps.navigationState.routes.length !==
        navigationState.routes.length ||
      prevProps.navigationState.index !== navigationState.index ||
      prevState.layout.width !== layout.width ||
      prevState.tabWidths !== tabWidths
    ) {
      if (
        this.getFlattenedTabWidth(this.props.tabStyle) === 'auto' &&
        !(
          layout.width &&
          navigationState.routes.every(
            // @ts-ignore
            r => typeof tabWidths[r.key] === 'number',
          )
        )
      ) {
        return;
      }
      this.resetScroll(navigationState!.index);
    }
  }
  measuredTabWidths = {};
  scrollAmount = new Animated.Value(0);
  scrollView: any;
  getFlattenedTabWidth = (style: StyleProp<ViewStyle>) => {
    const tabStyle = StyleSheet.flatten(style);
    return tabStyle ? tabStyle.width : undefined;
  };
  getComputedTabWidth = (
    index: number,
    layout: Layout,
    routes: Route[],
    scrollEnabled: boolean | undefined,
    tabWidths: {[key: string]: number},
    flattenedWidth: string | number | undefined,
  ) => {
    if (flattenedWidth === 'auto') {
      return tabWidths[routes[index].key] || 0;
    }
    switch (typeof flattenedWidth) {
      case 'number':
        return flattenedWidth;
      case 'string':
        if (flattenedWidth.endsWith('%')) {
          const width = parseFloat(flattenedWidth);
          if (Number.isFinite(width)) {
            return layout.width * (width / 100);
          }
        }
    }
    if (scrollEnabled) {
      return (layout.width / 5) * 2;
    }
    return layout.width / routes.length;
  };
  getMemoizedTabWidthGetter = memoize(
    (
        layout: Layout,
        routes: Route[],
        scrollEnabled: boolean | undefined,
        tabWidths: {[key: string]: number},
        flattenedWidth: string | number | undefined,
      ) =>
      (i: any) =>
        this.getComputedTabWidth(
          i,
          layout,
          routes,
          scrollEnabled,
          tabWidths,
          flattenedWidth,
        ),
  );
  getMaxScrollDistance = (tabBarWidth: number, layoutWidth: number) =>
    tabBarWidth - layoutWidth;
  getTabBarWidth = (props: ITabBarProps<T>, state: TabBarState) => {
    const {layout, tabWidths} = state;
    const {scrollEnabled, tabStyle, contentContainerOffset} = props;
    const {routes} = props.navigationState;
    const tabsWidth = routes.reduce<number>(
      (acc, _, i) =>
        acc +
        this.getComputedTabWidth(
          i,
          layout,
          routes,
          scrollEnabled,
          tabWidths!,
          this.getFlattenedTabWidth(tabStyle),
        ),
      0,
    );
    return tabsWidth + contentContainerOffset! * 2;
  };
  normalizeScrollValue = (
    props: ITabBarProps<T>,
    state: TabBarState,
    value: number,
  ) => {
    const {layout} = state;
    const tabBarWidth = this.getTabBarWidth(props, state);
    const maxDistance = this.getMaxScrollDistance(tabBarWidth, layout.width);
    const scrollValue = Math.max(Math.min(value, maxDistance), 0);
    if (Platform.OS === 'android' && I18nManager.isRTL) {
      // On Android, scroll value is not applied in reverse in RTL
      // so we need to manually adjust it to apply correct value
      return maxDistance - scrollValue;
    }
    return scrollValue;
  };
  getScrollAmount = (props: any, state: any, index: any) => {
    const {layout, tabWidths} = state;
    const {scrollEnabled, tabStyle} = props;
    const {routes} = props.navigationState;
    const centerDistance: any = Array.from({length: index + 1}).reduce(
      (total, _, i) => {
        const tabWidth = this.getComputedTabWidth(
          i,
          layout,
          routes,
          scrollEnabled,
          tabWidths,
          this.getFlattenedTabWidth(tabStyle),
        );
        // To get the current index centered we adjust scroll amount by width of indexes
        // 0 through (i - 1) and add half the width of current index i
        // @ts-ignore
        return total + (index === i ? tabWidth / 2 : tabWidth);
      },
      0,
    );
    const scrollAmount = centerDistance - layout.width / 2;
    return this.normalizeScrollValue(props, state, scrollAmount);
  };
  resetScroll = (index: number) => {
    if (this.props.scrollEnabled) {
      this.scrollView &&
        this.scrollView.scrollTo({
          x: this.getScrollAmount(this.props, this.state, index),
          animated: true,
        });
    }
  };
  handleLayout = (e: LayoutChangeEvent) => {
    const {height, width} = e.nativeEvent.layout;
    if (
      this.state.layout.width === width &&
      this.state.layout.height === height
    ) {
      return;
    }
    // If we don't delay this state update, the UI gets stuck in weird state
    // Maybe an issue in Reanimated?
    // https://github.com/react-native-community/react-native-tab-view/issues/877
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        this.setState({
          layout: {
            height,
            width,
          },
        }),
      ),
    );
  };
  getTranslateX = memoize(
    (scrollAmount: Animated.Node<number>, maxScrollDistance: number) =>
      Animated.multiply(
        Platform.OS === 'android' && I18nManager.isRTL
          ? Animated.sub(maxScrollDistance, scrollAmount)
          : scrollAmount,
        I18nManager.isRTL ? 1 : -1,
      ),
  );
  render() {
    const {
      position,
      navigationState,
      jumpTo,
      scrollEnabled,
      bounces,
      getAccessibilityLabel,
      getAccessible,
      getLabelText,
      getTestID,
      renderBadge,
      renderIcon,
      renderLabel,
      pressColor,
      pressOpacity,
      onTabPress,
      onTabLongPress,
      tabStyle,
      labelStyle,
      activeLabelStyle,
      indicatorStyle,
      contentContainerStyle,
      contentContainerOffset,
      style,
      indicatorContainerStyle,
      segmentView,
      segmentLineColor,
      activeTabBackground,
    } = this.props;
    const {layout, tabWidths} = this.state;
    const {routes} = navigationState;
    const isWidthDynamic = this.getFlattenedTabWidth(tabStyle) === 'auto';
    const tabBarWidth = this.getTabBarWidth(this.props, this.state);
    const tabBarWidthPercent = `${routes.length * 40}%`;
    const translateX = this.getTranslateX(
      this.scrollAmount,
      this.getMaxScrollDistance(tabBarWidth, layout.width),
    );
    return (
      <Animated.View
        onLayout={this.handleLayout}
        style={[styles.tabBar, segmentView && styles.segmentView, style]}>
        {!segmentView && (
          <>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.indicatorContainer,
                scrollEnabled ? {transform: [{translateX}]} : null,
                tabBarWidth
                  ? {width: tabBarWidth}
                  : scrollEnabled
                  ? {width: tabBarWidthPercent}
                  : null,
                indicatorContainerStyle,
              ]}>
              {this!.props!.renderIndicator!({
                position,
                layout,
                navigationState,
                jumpTo,
                width: isWidthDynamic ? 'auto' : `${100 / routes.length}%`,
                style: indicatorStyle,
                getTabWidth: this.getMemoizedTabWidthGetter(
                  layout,
                  routes,
                  scrollEnabled,
                  tabWidths,
                  this.getFlattenedTabWidth(tabStyle),
                ),
                contentContainerOffset,
              })}
            </Animated.View>
          </>
        )}
        <View style={styles.scroll}>
          <Animated.ScrollView
            horizontal
            accessibilityRole="tablist"
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
            bounces={bounces}
            alwaysBounceHorizontal={false}
            scrollsToTop={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            overScrollMode="never"
            contentContainerStyle={[
              styles.tabContent,
              scrollEnabled
                ? {width: tabBarWidth || tabBarWidthPercent}
                : styles.container,
              contentContainerStyle,
              {
                marginLeft: contentContainerOffset,
              },
            ]}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {x: this.scrollAmount},
                },
              },
            ])}
            ref={el => {
              this.scrollView = el && el.getNode();
            }}>
            {routes.map((route: any) => (
              <TabBarItem
                segmentLineColor={segmentLineColor}
                activeTabBackground={activeTabBackground}
                segmentView={segmentView}
                onLayout={
                  isWidthDynamic
                    ? e => {
                        // @ts-ignore
                        this.measuredTabWidths[route.key] =
                          e.nativeEvent.layout.width;
                        if (
                          routes.every(
                            (r: any) =>
                              // @ts-ignore
                              typeof this.measuredTabWidths[r.key] === 'number',
                          )
                        ) {
                          this.setState({
                            tabWidths: {...this.measuredTabWidths},
                          });
                        }
                      }
                    : undefined
                }
                key={route.key}
                position={position}
                route={route}
                navigationState={navigationState}
                getAccessibilityLabel={getAccessibilityLabel}
                getAccessible={getAccessible}
                getLabelText={getLabelText}
                getTestID={getTestID}
                renderBadge={renderBadge}
                renderIcon={renderIcon}
                renderLabel={renderLabel}
                pressColor={pressColor}
                pressOpacity={pressOpacity}
                onPress={() => {
                  const event: any = {
                    route,
                    defaultPrevented: false,
                    preventDefault: () => {
                      event.defaultPrevented = true;
                    },
                  };
                  onTabPress && onTabPress(event);
                  if (event.defaultPrevented) {
                    return;
                  }
                  this!.props!.jumpTo!(route.key);
                }}
                onLongPress={() => onTabLongPress && onTabLongPress({route})}
                labelStyle={labelStyle}
                activeLabelStyle={activeLabelStyle}
                style={tabStyle}
              />
            ))}
          </Animated.ScrollView>
        </View>
      </Animated.View>
    );
  }
}

TabBar.defaultProps = {
  getLabelText: ({route}: Scene<Route>) =>
    typeof route.title === 'string' ? route.title.toUpperCase() : route.title,
  getAccessible: ({route}: Scene<Route>) =>
    typeof route.accessible !== 'undefined' ? route.accessible : true,
  getAccessibilityLabel: ({route}: Scene<Route>) =>
    typeof route.accessibilityLabel === 'string'
      ? route.accessibilityLabel
      : typeof route.title === 'string'
      ? route.title
      : undefined,
  getTestID: ({route}: Scene<Route>) => route.testID,
  renderIndicator: (props: ITabBarIndicatorProps<Route>) => (
    <TabBarIndicator {...props} />
  ),
  contentContainerOffset: 0,
};
